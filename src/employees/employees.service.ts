import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {

    const newEmployee = await this.prismaService.employee.create({
      data: {
        id: createEmployeeDto.employeeId,
        firstName: createEmployeeDto.firstName,
        lastName: createEmployeeDto.lastName,
        email: createEmployeeDto.email,
        gender: createEmployeeDto.gender,
        active: createEmployeeDto.active,
        department: createEmployeeDto.department,
        designation: createEmployeeDto.designation,
        birthDate: new Date(createEmployeeDto.birthDate),
        hireDate: new Date(createEmployeeDto.hireDate) 
      }
    })
    return newEmployee;
  }


  findAll() {

    return this.prismaService.employee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        gender: true,
        active: true,
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

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: string) {
    const removedEmployee = await this.prismaService.employee.delete({
      where: {
        id: id
      }
    })

    console.log(removedEmployee)
    return removedEmployee
  }
}
