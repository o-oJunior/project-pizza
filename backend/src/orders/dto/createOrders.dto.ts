import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateOrdersDto {
  @IsNotEmpty()
  @IsNumber()
  code: number

  @IsNotEmpty()
  @IsNumber()
  total: number

  dateOrder: string

  timeOrder: string

  @IsNotEmpty()
  @IsNumber()
  idClient: number

  @IsNotEmpty()
  @IsNumber()
  idAddress: number

  @IsOptional()
  @IsNumber()
  idPizzaSize: number

  @IsOptional()
  @IsNumber()
  idFlavor: number

  @IsOptional()
  @IsNumber()
  idBorder: number

  @IsOptional()
  @IsNumber()
  idBud: number

  @IsOptional()
  @IsNumber()
  idDrink: number

  @IsOptional()
  @IsNumber()
  idCombo: number
}
