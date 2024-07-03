import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductTypesEntity } from "src/product-type/entities/productType.entity"

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  price: number
  @Column()
  productTypeId: number
  @ManyToOne(() => ProductTypesEntity, (productType) => productType.products)
  productType: ProductTypesEntity
}

