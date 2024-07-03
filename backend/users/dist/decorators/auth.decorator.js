"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const roles_decorator_1 = require("./roles.decorator");
function Auth(role) {
    return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(role), (0, common_1.UseGuards)(auth_middleware_1.AuthGuard, role_middleware_1.RoleGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map