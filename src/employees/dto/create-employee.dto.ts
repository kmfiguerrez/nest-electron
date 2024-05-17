import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

import { Gender } from "@prisma/client"

export class CreateEmployeeDto {
  
  @IsString()
  @IsNotEmpty()
  employeeId: string
  
  @IsString()
  @IsNotEmpty()  
  firstName: string

  @IsString()
  @IsNotEmpty()  
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender

  @IsBoolean()
  @IsNotEmpty()
  active: boolean

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date

  @IsString()
  @IsNotEmpty()  
  designation: string

  @IsString()
  @IsNotEmpty()  
  department: string

  @IsDateString()
  @IsNotEmpty()  
  hireDate: Date
}
