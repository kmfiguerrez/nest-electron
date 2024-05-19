import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = await this.prismaService.employee.create({
        data: {
          employeeId: createEmployeeDto.
        }
      })
      console.log(newEmployee)
      return newEmployee;
    } 
    catch (error: unknown) {
      console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        const fields = error.meta.target as Array<string>
        if (fields.includes("employee_id")) throw new ForbiddenException("Employee ID already in use")
        if (fields.includes("email")) throw new ForbiddenException("Email already in use")
      }
    }    
  }


  findAll() {
    return this.prismaService.employee.findMany({
      select: {
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        gender: true,
        statusName: true,
        birthDate: true,
        designation: true,
        department: true,
        hireDate: true
      }
    })
  }



  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const modifiedEmployee = await this.prismaService.employee.update({
        where: {
          employeeId: updateEmployeeDto.employeeId
        },
        data: {
          ...updateEmployeeDto,
          birthDate: new Date(updateEmployeeDto.birthDate),
          hireDate: new Date(updateEmployeeDto.hireDate)
        }
      })
  
      return modifiedEmployee;      
    } 
    catch (error: unknown) {
      console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        const fields = error.meta.target as Array<string>
        if (fields.includes("employee_id")) throw new ForbiddenException("Employee ID already in use")
        if (fields.includes("email")) throw new ForbiddenException("Email already in use")
      }
    }

  }


  async remove(id: string) {
    const removedEmployee = await this.prismaService.employee.delete({
      where: {
        employeeId: id
      }
    })

    return removedEmployee
  }
}
