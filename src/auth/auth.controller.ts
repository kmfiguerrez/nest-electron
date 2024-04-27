import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IAuthDTO } from "./dto";

@Controller('api/auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: IAuthDTO) {
    console.dir(dto)
    return this.authService.signup()
  }

  @Post('signin')
  signin() {
    return this.authService.login()
  }  
}