import { UseGuards, applyDecorators } from "@nestjs/common"
import { Role } from "src/enums/role.enum"
import { AuthGuard } from "src/middlewares/auth.middleware"
import { RoleGuard } from "src/middlewares/role.middleware"
import { Roles } from "./roles.decorator"

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RoleGuard)
  )
}