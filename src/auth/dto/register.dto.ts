import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  name: string

  @IsNotEmpty()
  @IsString()
  password: string
}