import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('system_config')
export class SystemConfig {
  @ApiProperty({ description: 'ID unique de la configuration' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom du site' })
  @Column({ type: 'text', default: 'Agnigna Gna' })
  site_name: string;

  @ApiProperty({ description: 'Email du site' })
  @Column({ type: 'text' })
  site_email: string;

  @ApiProperty({ description: 'Téléphone du site' })
  @Column({ type: 'text', nullable: true })
  site_phone: string;

  @ApiProperty({ description: 'Mode maintenance' })
  @Column({ type: 'boolean', default: false })
  maintenance_mode: boolean;

  // Configuration SMTP
  @ApiProperty({ description: 'Serveur SMTP' })
  @Column({ type: 'text', nullable: true })
  smtp_host: string;

  @ApiProperty({ description: 'Port SMTP' })
  @Column({ type: 'text', nullable: true })
  smtp_port: string;

  @ApiProperty({ description: 'Utilisateur SMTP' })
  @Column({ type: 'text', nullable: true })
  smtp_user: string;

  @ApiProperty({ description: 'Mot de passe SMTP' })
  @Column({ type: 'text', nullable: true })
  smtp_password: string;

  // Configuration Base de données
  @ApiProperty({ description: 'Backup automatique' })
  @Column({ type: 'boolean', default: false })
  auto_backup: boolean;

  @ApiProperty({ description: 'Fréquence de backup' })
  @Column({ type: 'text', default: 'daily' })
  backup_frequency: string;

  @ApiProperty({ description: 'Connexions maximales' })
  @Column({ type: 'int', default: 100 })
  max_connections: number;

  // Sécurité
  @ApiProperty({ description: 'Longueur minimale du mot de passe' })
  @Column({ type: 'int', default: 8 })
  min_password_length: number;

  @ApiProperty({ description: 'Délai d\'expiration de session (minutes)' })
  @Column({ type: 'int', default: 60 })
  session_timeout: number;

  @ApiProperty({ description: 'Tentatives de connexion maximales' })
  @Column({ type: 'int', default: 5 })
  max_login_attempts: number;

  @ApiProperty({ description: 'Authentification 2FA' })
  @Column({ type: 'boolean', default: false })
  enable_2fa: boolean;

  // Notifications
  @ApiProperty({ description: 'Notifications email' })
  @Column({ type: 'boolean', default: true })
  email_notifications: boolean;

  @ApiProperty({ description: 'Notifications SMS' })
  @Column({ type: 'boolean', default: false })
  sms_notifications: boolean;

  @ApiProperty({ description: 'Notifications push' })
  @Column({ type: 'boolean', default: false })
  push_notifications: boolean;

  // API
  @ApiProperty({ description: 'Limite de requêtes API' })
  @Column({ type: 'int', default: 100 })
  api_rate_limit: number;

  @ApiProperty({ description: 'Rotation des clés API (jours)' })
  @Column({ type: 'int', default: 90 })
  api_key_rotation_days: number;

  @ApiProperty({ description: 'Date de mise à jour' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ApiProperty({ description: 'Mis à jour par (user ID)' })
  @Column({ type: 'uuid', nullable: true })
  updated_by: string;
}
