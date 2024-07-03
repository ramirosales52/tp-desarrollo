import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  createRole(
    @Body() newRole: CreateRoleDto,
  ) {
    return this.rolesService.createRole(newRole)
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles()
  }

  @Put(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(id, role)
  }

  @Delete(':id')
  deleteRole(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.rolesService.deleteRole(id)
  }

}
