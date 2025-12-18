import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

export enum PropertyType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  AGRICULTURAL = 'agricultural',
  INDUSTRIAL = 'industrial',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  PENDING = 'pending',
}

@Entity('properties')
export class Property {
  @ApiProperty({ description: 'ID unique de la propriété' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Titre de la propriété' })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({ description: 'Description de la propriété', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Prix de la propriété' })
  @Column({ type: 'text' })
  price: string;

  @ApiProperty({ description: 'Localisation' })
  @Column({ type: 'text' })
  location: string;

  @ApiProperty({ description: 'Type de propriété', enum: PropertyType })
  @Column({
    type: 'enum',
    enum: PropertyType,
    nullable: true,
  })
  type: PropertyType;

  @ApiProperty({ description: 'Statut de la propriété', enum: PropertyStatus })
  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.AVAILABLE,
  })
  status: PropertyStatus;

  @ApiProperty({ description: 'Superficie', required: false })
  @Column({ type: 'text', nullable: true })
  area: string;

  @ApiProperty({ description: 'Nombre de chambres' })
  @Column({ type: 'int', default: 0 })
  bedrooms: number;

  @ApiProperty({ description: 'Nombre de salles de bain' })
  @Column({ type: 'int', default: 0 })
  bathrooms: number;

  @ApiProperty({ description: 'URL de l\'image', required: false })
  @Column({ type: 'text', nullable: true })
  image: string;

  @ApiProperty({ description: 'Nombre de vues' })
  @Column({ type: 'int', default: 0 })
  views: number;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  // Relations
  @OneToMany(() => Transaction, (transaction) => transaction.property)
  transactions: Transaction[];
}
