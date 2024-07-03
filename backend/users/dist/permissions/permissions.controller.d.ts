import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    createPermission(newPermission: CreatePermissionDto): Promise<import("./entities/permission.entity").PermissionEntity>;
    getPermissions(): Promise<import("./entities/permission.entity").PermissionEntity[]>;
    updatePermission(id: number, permission: UpdatePermissionDto): Promise<import("./entities/permission.entity").PermissionEntity & UpdatePermissionDto>;
    deletePermission(id: number): Promise<import("./entities/permission.entity").PermissionEntity>;
}
