import { UseGuards, applyDecorators } from "@nestjs/common"
import { Role } from "src/common/enums/role.enum"
import { Roles } from "./roles.decorator"
import { AuthGuard } from "../guards/auth.guard"
import { RoleGuard } from "../guards/role.guard"

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, RoleGuard)
  )
}