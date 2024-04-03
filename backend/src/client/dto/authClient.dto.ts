import { IsNotEmpty, IsString } from 'class-validator'

export class AuthClientDto {
  @IsString()
  @IsNotEmpty()
  user: string

  @IsString()
  @IsNotEmpty()
  password: string
}
