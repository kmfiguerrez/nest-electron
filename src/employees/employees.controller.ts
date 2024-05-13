import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { JwtGuard } from 'src/auth/guard';


@Controller('employees')
export class EmployeesController {
  @UseGuards(JwtGuard)
  @Get()
  getEmployees(@Req() req: Request) {
    console.log("yo")
    console.log("fuck", req.user)
    return {employees: "Employees"}
  }
}
