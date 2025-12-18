import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Transaction } from './transaction.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

@Entity('profiles')
export class User {
  @ApiProperty({ description: 'ID unique de l\'utilisateur' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({ description: 'Nom complet', required: false })
  @Column({ type: 'text', nullable: true })
  full_name: string;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @ApiProperty({ description: 'Téléphone', required: false })
  @Column({ type: 'text', nullable: true })
  phone: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: UserRole })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  password: string;

  @ApiProperty({ description: 'Permissions de l\'utilisateur' })
  @Column({ type: 'jsonb', nullable: true })
  permissions: {
    can_view_properties?: boolean;
    can_edit_properties?: boolean;
    can_delete_properties?: boolean;
    can_view_users?: boolean;
    can_manage_users?: boolean;
    can_view_contacts?: boolean;
    can_reply_contacts?: boolean;
    can_view_transactions?: boolean;
    can_view_statistics?: boolean;
    can_manage_settings?: boolean;
  };

  @ApiProperty({ description: 'Compte vérifié' })
  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @ApiProperty({ description: 'Compte actif' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'Dernière connexion', required: false })
  @Column({ type: 'timestamp with time zone', nullable: true })
  last_login: Date;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  // Relations
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
