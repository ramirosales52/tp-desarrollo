import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestWithUser } from 'src/common/interfaces/request-user';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }  

  @Get('can-do/:permission')
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    return this.usersService.canDo(request.user, permission);
  }
  
}
