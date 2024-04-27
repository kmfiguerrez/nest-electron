import { ForbiddenException, Injectable } from "@nestjs/common";

import { LoginDTO, RegisterDTO } from "./dto";

import * as argon2 from "argon2";

import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDTO) {
    try {
      // Generate the password hash.
      const hashPassword = await argon2.hash(dto.password)
      // Save the new user in the db.
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name === "" ? null : dto.name,
          password: hashPassword
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
        console.log(existingEmail)
        if (existingEmail) throw new ForbiddenException("Email already exists")
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

    // Do not include the hashed password.
    delete existingUser.password

    // return the user
    return existingUser
  }
}