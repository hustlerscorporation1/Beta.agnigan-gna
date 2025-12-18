import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from './property.entity';

export enum ContactStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

export enum ContactPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('contacts')
export class Contact {
  @ApiProperty({ description: 'ID unique du contact' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom du contact' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ description: 'Email du contact' })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({ description: 'Téléphone', required: false })
  @Column({ type: 'text', nullable: true })
  phone: string;

  @ApiProperty({ description: 'Message' })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({ description: 'Sujet', required: false })
  @Column({ type: 'text', nullable: true })
  subject: string;

  @ApiProperty({ description: 'Statut du message', enum: ContactStatus })
  @Column({
    type: 'enum',
    enum: ContactStatus,
    default: ContactStatus.UNREAD,
  })
  status: ContactStatus;

  @ApiProperty({ description: 'Priorité du message', enum: ContactPriority })
  @Column({
    type: 'enum',
    enum: ContactPriority,
    default: ContactPriority.MEDIUM,
  })
  priority: ContactPriority;

  @ApiProperty({ description: 'ID de la propriété associée', required: false })
  @Column({ type: 'uuid', nullable: true })
  property_id: string;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Property, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
