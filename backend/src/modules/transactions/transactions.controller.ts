import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { TransactionStatus } from '../../common/entities/transaction.entity';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  async create(@Body() createTransactionDto: any) {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: TransactionStatus,
  ) {
    return await this.transactionsService.findAll(page, limit, status);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get transaction statistics' })
  async getStatistics() {
    return await this.transactionsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  async findOne(@Param('id') id: string) {
    return await this.transactionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  async update(@Param('id') id: string, @Body() updateTransactionDto: any) {
    return await this.transactionsService.update(id, updateTransactionDto);
  }
}
