// See: https://docs.nestjs.com/recipes/passport#login-route

import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(){
    super()
  }
}