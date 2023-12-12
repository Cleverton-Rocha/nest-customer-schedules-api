import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: `Sua senha deve conter pelo menos um dígito ou um caractere especial, não deve conter um ponto (.) ou uma quebra de linha, deve ter pelo menos uma letra maiúscula, deve ter pelo menos uma letra minúscula.`,
  })
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
