import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact, ContactStatus } from '../../common/entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: Partial<Contact>): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contact);
  }

  async findAll(page: number = 1, limit: number = 10, status?: ContactStatus) {
    const where = status ? { status } : {};
    const [contacts, total] = await this.contactRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['property'],
    });

    return {
      data: contacts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: ['property'],
    });
    if (!contact) throw new NotFoundException(`Contact with ID ${id} not found`);
    return contact;
  }

  async update(id: string, updateContactDto: Partial<Contact>): Promise<Contact> {
    const contact = await this.findOne(id);
    Object.assign(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  async remove(id: string): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
  }

  async getStatistics() {
    const total = await this.contactRepository.count();
    const unread = await this.contactRepository.count({ where: { status: ContactStatus.UNREAD } });
    const read = await this.contactRepository.count({ where: { status: ContactStatus.READ } });
    const replied = await this.contactRepository.count({ where: { status: ContactStatus.REPLIED } });
    return { total, unread, read, replied };
  }
}
