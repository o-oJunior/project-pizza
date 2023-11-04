import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @Length(3, 20, { message: 'O nome de usuário deve ter entre 3 a 20 caracteres!' })
  name: string

  @IsOptional()
  @IsString()
  @Length(14)
  phone: string

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  hashPassword: string
}
