import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    code: string
    @Column()
    description: string
    // @Column()
    // permissionId: number
}
