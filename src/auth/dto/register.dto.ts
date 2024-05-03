import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDTO {

  @IsString()
  @IsNotEmpty()
  employeeId: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}