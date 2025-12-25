import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export function IsPassword() {
  return applyDecorators(
    MaxLength(128),
    IsNotEmpty(),
    Matches(/^.*(?=^.{10,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*[\s]).*$/, {
      message:
        'Invalid password format: Password must be a combination of 10 to 20 characters, including uppercase letters, lowercase letters, numbers, and symbols.',
    }),
  );
}
