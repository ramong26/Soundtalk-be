import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Provider } from 'src/common/enums/provider.enum';
import { Exclude } from 'class-transformer';

// 옵셔널이 맞는지 이걸 삭제하면 auth.service.ts에서 오류가 남
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('varchar', { length: 100 })
  accountName?: string;

  @Column('varchar', { length: 255, unique: true })
  email?: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: Provider, nullable: true })
  provider?: Provider;

  @Column({ nullable: true })
  providerId?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => User, (user) => user.account)
  user?: User;
}
