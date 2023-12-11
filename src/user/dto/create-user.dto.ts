import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: `Sua senha deve conter pelo menos um dígito ou um caractere especial, não deve conter um ponto (.) ou uma quebra de linha, deve ter pelo menos uma letra maiúscula, deve ter pelo menos uma letra minúscula.`,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
