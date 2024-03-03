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
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Length(10)
  dateCreated: string

  @IsString()
  @IsNotEmpty()
  @Length(8)
  timeCreated: string

  hashPassword: string
}
