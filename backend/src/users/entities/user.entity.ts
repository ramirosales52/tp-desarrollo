import { Role } from 'src/common/enums/role.enum';
import { UserI } from 'src/common/interfaces/user.interface';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({ type: 'enum', enum: Role, default: Role.USER }) // Agregar un desplegable para elegir los roles (no compatible con SQLite)
  @Column({ default: Role.USER })
  role: Role;

  get permissionCodes() {
    return ['create-users'];
  }
}
