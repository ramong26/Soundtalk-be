import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  nickname: string;

  @Expose()
  profile: string;

  @Expose()
  createdAt: Date;
}
