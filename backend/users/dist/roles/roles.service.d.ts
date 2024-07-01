import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<RoleEntity>);
    createRole(role: CreateRoleDto): Promise<RoleEntity>;
    getRoles(): Promise<RoleEntity[]>;
    updateRole(id: number, role: UpdateRoleDto): Promise<RoleEntity & UpdateRoleDto>;
    deleteRole(id: number): Promise<RoleEntity>;
}
