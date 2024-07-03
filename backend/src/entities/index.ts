import { PermissionEntity } from "src/permissions/entities/permission.entity";
import { ProductTypesEntity } from "src/product-type/entities/productType.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { RoleEntity } from "src/roles/entities/role.entity";
import { UserEntity } from "src/users/entities/user.entity";

export const entities = [ProductEntity, ProductTypesEntity, UserEntity, RoleEntity, PermissionEntity]