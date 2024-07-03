import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PermissionEntity } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>
  ) { }

  async createPermission(permission: CreatePermissionDto) {
    const newPermission = this.permissionRepository.create(permission)

    return this.permissionRepository.save(newPermission)
  }

  getPermissions() {
    return this.permissionRepository.find()
  }

  async updatePermission(id: number, permission: UpdatePermissionDto) {
    const permissionFound = await this.permissionRepository.findOne({
      where: {
        id
      }
    })

    if (!permissionFound) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND)
    }

    const updatedPermission = Object.assign(permissionFound, permission)
    return this.permissionRepository.save(updatedPermission)
  }

  async deletePermission(id: number) {
    const permissionFound = await this.permissionRepository.findOne({
      where: {
        id
      }
    })

    if (!permissionFound) {
      throw new HttpException('Permission not found', HttpStatus.NOT_FOUND)
    }
    
    return this.permissionRepository.remove(permissionFound)
  }
}
