import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { RequestWithUser } from 'src/interfaces/request-user';
import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';
// import { AuthGuard } from '../middlewares/auth.middleware';
// import { Roles } from 'src/decorators/roles.decorator';
// import { RoleGuard } from 'src/middlewares/role.middleware';
import { Role } from 'src/enums/role.enum';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('')
export class UsersController {
  constructor(private service: UsersService) {}

  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RoleGuard)
  @Get('me')
  @Auth(Role.USER)
  me(@Req() req: Request & { user: UserEntity }) {
    return req.user;
  }

  @Get('users')
  users() {
    return this.service.repository.find();
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  @Get('can-do/:permission')
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    return this.service.canDo(request.user, permission);
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }
}
