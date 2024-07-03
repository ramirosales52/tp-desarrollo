import { PermissionEntity } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Repository } from 'typeorm';
export declare class PermissionsService {
    private permissionRepository;
    constructor(permissionRepository: Repository<PermissionEntity>);
    createPermission(permission: CreatePermissionDto): Promise<PermissionEntity>;
    getPermissions(): Promise<PermissionEntity[]>;
    updatePermission(id: number, permission: UpdatePermissionDto): Promise<PermissionEntity & UpdatePermissionDto>;
    deletePermission(id: number): Promise<PermissionEntity>;
}
