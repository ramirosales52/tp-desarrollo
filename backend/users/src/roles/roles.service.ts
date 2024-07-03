import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>
  ) { }

  async createRole(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role)

    return this.roleRepository.save(newRole)
  }

  getRoles() {
    return this.roleRepository.find()
  }

  async updateRole(id: number, role: UpdateRoleDto) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        id
      }
    })

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    const updatedRole = Object.assign(roleFound, role)
    return this.roleRepository.save(updatedRole)
  }

  async deleteRole(id: number) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        id
      }
    })

    if (!roleFound) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }
    
    return this.roleRepository.remove(roleFound)
  }

}
