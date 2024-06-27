import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductEntity } from "./product.entity"

@Entity('productsTypes')
export class ProductTypesEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[]
}

