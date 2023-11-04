import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateClientDto {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string

  @IsString()
  @Length(14)
  @IsNotEmpty()
  cpf: string

  @IsString()
  @Length(14)
  phone: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 a 20 caracteres!' })
  @IsNotEmpty()
  hashPassword: string

  dateCreated: string

  timeCreated: string
}
