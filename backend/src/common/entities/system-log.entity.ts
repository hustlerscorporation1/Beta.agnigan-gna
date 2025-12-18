import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum LogType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

@Entity('system_logs')
export class SystemLog {
  @ApiProperty({ description: 'ID unique du log' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Type de log', enum: LogType })
  @Column({
    type: 'enum',
    enum: LogType,
  })
  type: LogType;

  @ApiProperty({ description: 'Action effectuée' })
  @Column({ type: 'text' })
  action: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @Column({ type: 'text', nullable: true })
  user_email: string;

  @ApiProperty({ description: 'ID de l\'utilisateur' })
  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @ApiProperty({ description: 'Adresse IP' })
  @Column({ type: 'text', nullable: true })
  ip_address: string;

  @ApiProperty({ description: 'Détails du log' })
  @Column({ type: 'text', nullable: true })
  details: string;

  @ApiProperty({ description: 'Métadonnées supplémentaires' })
  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
