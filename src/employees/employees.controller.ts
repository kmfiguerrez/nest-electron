import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from "express";


@Controller('employees')
export class EmployeesController {
  @UseGuards(AuthGuard("jwt"))
  @Get()
  getEmployees(@Req() req: Request) {
    console.log("yo")
    console.log("fuck", req.user)
    return {employees: "Employees"}
  }
}
