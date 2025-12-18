import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Property, PropertyStatus } from '../../common/entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAll(query: QueryPropertyDto) {
    const { page, limit, type, status, location, search, sortBy, sortOrder } = query;

    const where: FindOptionsWhere<Property> = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (location) where.location = Like(`%${location}%`);

    const queryBuilder = this.propertyRepository.createQueryBuilder('property');

    // Apply filters
    if (type) queryBuilder.andWhere('property.type = :type', { type });
    if (status) queryBuilder.andWhere('property.status = :status', { status });
    if (location) queryBuilder.andWhere('property.location ILIKE :location', { location: `%${location}%` });
    if (search) {
      queryBuilder.andWhere(
        '(property.title ILIKE :search OR property.description ILIKE :search OR property.location ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Sorting
    queryBuilder.orderBy(`property.${sortBy}`, sortOrder);

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [properties, total] = await queryBuilder.getManyAndCount();

    return {
      data: properties,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Increment views
    property.views += 1;
    await this.propertyRepository.save(property);

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);
    Object.assign(property, updatePropertyDto);
    return await this.propertyRepository.save(property);
  }

  async remove(id: string): Promise<void> {
    const property = await this.findOne(id);
    await this.propertyRepository.remove(property);
  }

  async getStatistics() {
    const total = await this.propertyRepository.count();
    const available = await this.propertyRepository.count({ where: { status: PropertyStatus.AVAILABLE } });
    const sold = await this.propertyRepository.count({ where: { status: PropertyStatus.SOLD } });
    const pending = await this.propertyRepository.count({ where: { status: PropertyStatus.PENDING } });

    const typeStats = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('property.type')
      .getRawMany();

    return {
      total,
      byStatus: { available, sold, pending },
      byType: typeStats,
    };
  }

  async getMostViewed(limit: number = 5): Promise<Property[]> {
    return await this.propertyRepository.find({
      order: { views: 'DESC' },
      take: limit,
    });
  }

  async getRecent(limit: number = 5): Promise<Property[]> {
    return await this.propertyRepository.find({
      order: { created_at: 'DESC' },
      take: limit,
    });
  }
}
