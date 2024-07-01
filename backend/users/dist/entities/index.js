"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const permission_entity_1 = require("../permissions/entities/permission.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const user_entity_1 = require("./user.entity");
exports.entities = [user_entity_1.UserEntity, permission_entity_1.PermissionEntity, role_entity_1.RoleEntity];
//# sourceMappingURL=index.js.map