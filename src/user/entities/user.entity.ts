import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import { Account } from './account.entity';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  @MaxLength(100)
  nickname: string;

  @Column({ nullable: true })
  profile: string;

  @Column('text', { nullable: true })
  @MaxLength(65535)
  @IsOptional()
  @Exclude()
  token: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Account, (account) => account.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  @Exclude()
  account: Account;
}
