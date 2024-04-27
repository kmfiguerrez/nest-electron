import { Injectable } from "@nestjs/common";

import { AuthDTO } from "./dto";

import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDTO) {
    try {
      // Generate the password hash.
      const hashPassword = await argon2.hash(dto.password)
      // Save the new user in the db.
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword
        }
      })
      // Return the save user.
      return user
    } 
    catch (error: unknown) {
      // console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        console.log("Name: ", error.name)
        console.log("Message: ", error.message)
        console.log("Code: ", error.code)
      }
    }    
  }

  login() {}
}