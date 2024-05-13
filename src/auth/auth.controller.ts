import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./dto";



@Controller('auth')
export class AuthController{
  constructor(
    private authService: AuthService,

  ) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto)
  }


  // See serialization in nestjs docs.
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async signin(@Body() dto: LoginDTO) {
    return this.authService.login(dto)

  }  
}