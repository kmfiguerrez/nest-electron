import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { LoginDTO, RegisterDTO } from "./dto";

import * as argon2 from "argon2";

import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserEntity } from "./entities/user.entity";



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDTO) {    
    try {
      // Verify the employee first.
      const existingEmployee = await this.prisma.employee.findUnique({
        where: {
          id: dto.employeeId
        }        
      })
      if (!existingEmployee) throw new NotFoundException("Employee does not exists")

      // Generate the password hash.
      const hashPassword = await argon2.hash(dto.password)
      // Save the new user in the db.
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
          employeeId: dto.employeeId
        }
      })
      // Do not include the hashed password.
      delete user.password

      // Return the save user.
      return user
    } 
    catch (error: unknown) {
      // console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        const existingEmail = error.message.includes("Unique constraint failed on the fields: (`email`)")
        if (existingEmail) throw new ForbiddenException("Email already exists")
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException("Invalid employee ID")
      }
    }    
  }




  async login(dto: LoginDTO) {
    // Find user by email.
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }

    })
    if (!existingUser) throw new ForbiddenException("Invalid credentials")

    // Compare password.
    const passwordMatch = await argon2.verify(existingUser.password, dto.password)
    if (!passwordMatch) throw new ForbiddenException("Invalid credentials")
    
    // Get the employee info.
    const existingEmployee = await this.prisma.employee.findUnique({
      where: {
        id: existingUser.employeeId
      },
      select: {
        designation: true,
        department: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            image: true
          }
        }
      }
    })

    // return the user
    return new UserEntity(existingEmployee)
  }
}