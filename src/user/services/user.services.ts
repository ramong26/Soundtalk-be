import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 모든 사용자 조회
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // ID로 사용자 조회
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 이메일로 사용자 조회
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.account', 'account')
      .where('account.email = :email', { email })
      .getOne();
  }

  // 사용자 생성
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  // 사용자 업데이트
  async update(id: number, updateData: Partial<User>): Promise<User | null> {
    const result = await this.userRepository.update(id, updateData);
    if (!result.affected) {
      return null;
    }
    return this.findById(id);
  }

  // 사용자 삭제
  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
