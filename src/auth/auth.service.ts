import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { LoginDTO, RegisterDTO } from "./dto";

import * as argon2 from "argon2";

import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserEntity } from "./entities/user.entity";

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";



@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDTO) {    
    try {
      // Verify the employee first.
      const existingEmployee = await this.prisma.employee.findUnique({
        where: {
          employeeId: dto.employeeId
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
      return {data: "User created"}
    } 
    catch (error: unknown) {
      // console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        const existingEmail = error.message.includes("Unique constraint failed on the fields: (`email`)")
        if (existingEmail) throw new ForbiddenException("Email already in use")
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException("Employee ID does not exists")
      }
    }    
  }




  async login(dto: LoginDTO) {
    try {    
      // Find user by email.
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email
        }

      })
      if (!existingUser) throw new NotFoundException("Invalid credentials")

      // Compare password.
      const passwordMatch = await argon2.verify(existingUser.password, dto.password)
      if (!passwordMatch) throw new ForbiddenException("Invalid credentials")
      
      // Get the employee info.
      const existingEmployee = await this.prisma.employee.findUnique({
        where: {
          employeeId: existingUser.employeeId
        },
        select: {
          designation: true,
          department: true,
          firstName: true,
          lastName: true,
          user: {
            select: {
              userId: true,
              email: true,
              role: true,
              image: true
            }
          }
        }
      })
      
      // return the user with jwt token.
      const accessToken = await this.generateToken({id: existingEmployee.user[0].userId, email: existingEmployee.user[0].email})
      return new UserEntity({...existingEmployee, accessToken})
    } 
    catch (error: unknown) {
      throw error
    }
  }


  async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email}
    return this.jwtService.signAsync(payload, {expiresIn: "1d", secret: this.config.get("JWT_SECRET")})
  }
}