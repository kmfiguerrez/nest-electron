import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string
}