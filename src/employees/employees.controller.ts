import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('employees')
export class EmployeesController {
  @Get()
  getEmployees(@GetUser() user: { sub: string, email: string }) {
    console.log("yo")
    console.log("fuck", user)
    return {employees: "Employees"}
  }
}
