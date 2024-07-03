import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  createPermission(
    @Body() newPermission: CreatePermissionDto,
  ) {
    return this.permissionsService.createPermission(newPermission)
  }

  @Get()
  getPermissions() {
    return this.permissionsService.getPermissions()
  }

  @Put(':id')
  updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() permission: UpdatePermissionDto,
  ) {
    return this.permissionsService.updatePermission(id, permission)
  }

  @Delete(':id')
  deletePermission(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.permissionsService.deletePermission(id)
  }

}
