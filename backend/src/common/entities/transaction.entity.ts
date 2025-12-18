import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Property } from './property.entity';

export enum TransactionType {
  PURCHASE = 'purchase',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  COMMISSION = 'commission',
}

export enum TransactionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed',
}

export enum PaymentMethod {
  CARD = 'card',
  MOBILE_MONEY = 'mobile_money',
  BANK_TRANSFER = 'bank_transfer',
}

@Entity('transactions')
export class Transaction {
  @ApiProperty({ description: 'ID unique de la transaction' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'ID de transaction' })
  @Column({ type: 'text', unique: true })
  transaction_id: string;

  @ApiProperty({ description: 'ID de l\'utilisateur' })
  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @ApiProperty({ description: 'ID de la propriété' })
  @Column({ type: 'uuid', nullable: true })
  property_id: string;

  @ApiProperty({ description: 'Montant' })
  @Column({ type: 'bigint' })
  amount: number;

  @ApiProperty({ description: 'Type de transaction', enum: TransactionType })
  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: true,
  })
  type: TransactionType;

  @ApiProperty({ description: 'Statut de la transaction', enum: TransactionStatus })
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ApiProperty({ description: 'Méthode de paiement', enum: PaymentMethod })
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  payment_method: PaymentMethod;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Property, (property) => property.transactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
