import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ActivityType {
  USER = 'user',
  PROPERTY = 'property',
  MESSAGE = 'message',
  SYSTEM = 'system',
}

@Entity('activities')
export class Activity {
  @ApiProperty({ description: 'ID unique de l\'activité' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Type d\'activité', enum: ActivityType })
  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  @ApiProperty({ description: 'Titre de l\'activité' })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({ description: 'Description de l\'activité' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'ID de l\'utilisateur' })
  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @ApiProperty({ description: 'Métadonnées de l\'activité' })
  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
