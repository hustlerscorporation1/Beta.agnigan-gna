import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from '../../common/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction);
  }

  async findAll(page: number = 1, limit: number = 10, status?: TransactionStatus) {
    const where = status ? { status } : {};
    const [transactions, total] = await this.transactionRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['user', 'property'],
    });

    return {
      data: transactions,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['user', 'property'],
    });
    if (!transaction) throw new NotFoundException(`Transaction with ID ${id} not found`);
    return transaction;
  }

  async update(id: string, updateTransactionDto: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updateTransactionDto);
    return await this.transactionRepository.save(transaction);
  }

  async getStatistics() {
    const total = await this.transactionRepository.count();
    const completed = await this.transactionRepository.count({ where: { status: TransactionStatus.COMPLETED } });
    const pending = await this.transactionRepository.count({ where: { status: TransactionStatus.PENDING } });
    const failed = await this.transactionRepository.count({ where: { status: TransactionStatus.FAILED } });

    const totalAmount = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.status = :status', { status: TransactionStatus.COMPLETED })
      .getRawOne();

    return {
      total,
      byStatus: { completed, pending, failed },
      totalAmount: totalAmount.total || 0,
    };
  }
}
