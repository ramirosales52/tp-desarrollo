import { ProductEntity } from "src/products/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('productsTypes')
export class ProductTypesEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[]
}

