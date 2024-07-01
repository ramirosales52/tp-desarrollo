import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    createRole(newRole: CreateRoleDto): Promise<import("./entities/role.entity").RoleEntity>;
    getRoles(): Promise<import("./entities/role.entity").RoleEntity[]>;
    updateRole(id: number, role: UpdateRoleDto): Promise<import("./entities/role.entity").RoleEntity & UpdateRoleDto>;
    deleteRole(id: number): Promise<import("./entities/role.entity").RoleEntity>;
}
