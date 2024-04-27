import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./dto";

@Controller('api/auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto)
  }

  @Post('login')
  signin(@Body() dto: LoginDTO) {
    return this.authService.login(dto)
  }  
}