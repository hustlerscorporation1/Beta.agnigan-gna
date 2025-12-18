import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ExportFormat {
  CSV = 'csv',
  JSON = 'json',
  EXCEL = 'excel',
}

export enum ExportStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('data_exports')
export class DataExport {
  @ApiProperty({ description: 'ID unique de l\'export' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Type d\'export' })
  @Column({ type: 'text' })
  export_type: string;

  @ApiProperty({ description: 'Format de l\'export', enum: ExportFormat })
  @Column({
    type: 'enum',
    enum: ExportFormat,
  })
  format: ExportFormat;

  @ApiProperty({ description: 'Chemin du fichier' })
  @Column({ type: 'text', nullable: true })
  file_path: string;

  @ApiProperty({ description: 'Taille du fichier (bytes)' })
  @Column({ type: 'bigint', nullable: true })
  file_size: number;

  @ApiProperty({ description: 'Statut de l\'export', enum: ExportStatus })
  @Column({
    type: 'enum',
    enum: ExportStatus,
    default: ExportStatus.PENDING,
  })
  status: ExportStatus;

  @ApiProperty({ description: 'Exporté par (user ID)' })
  @Column({ type: 'uuid', nullable: true })
  exported_by: string;

  @ApiProperty({ description: 'Date d\'export' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  exported_at: Date;
}
