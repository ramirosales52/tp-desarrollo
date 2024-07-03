import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveI } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RoleGuard)
  @Get('me')
  @Auth(Role.USER)
  me(@ActiveUser() user: UserActiveI) {
    return user;
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.authService.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }

}
