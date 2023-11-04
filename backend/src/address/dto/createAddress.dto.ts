import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: 'Cep inválido' })
  cep: string

  @IsNotEmpty()
  @IsString()
  street: string

  @IsNotEmpty()
  @IsString()
  district: string

  @IsNotEmpty()
  @IsString()
  locality: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsOptional()
  @IsString()
  complement: string

  @IsNotEmpty()
  @IsNumber()
  number: number

  @IsNotEmpty()
  @IsNumber()
  idClient: number
}
