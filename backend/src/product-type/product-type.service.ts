import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypesEntity } from './entities/productType.entity';

@Injectable()
export class ProductTypeService {

  constructor(
    @InjectRepository(ProductTypesEntity) 
    private productTypesRepository: Repository<ProductTypesEntity>
  ) { }

  createProductType(productType: CreateProductTypeDto) {
    const newProductType = this.productTypesRepository.create(productType)
    
    return this.productTypesRepository.save(newProductType)
  }

  getProductTypes() {
    return this.productTypesRepository.find({
      relations: ['products']
    })
  }

  async getProductType(id: number) {
    const productTypeFound = await this.productTypesRepository.findOne({
      where: {
        id
      },
      relations: ['products']
    })

    if (!productTypeFound) throw new HttpException("Product type not found", HttpStatus.NOT_FOUND)

    return productTypeFound
  }

  async updateProductType(id: number, productType: UpdateProductTypeDto) {
    const productTypeFound = await this.productTypesRepository.findOne({
      where: {
        id
      }
    })

    if (!productTypeFound) {
      return new HttpException("Product type not found", HttpStatus.NOT_FOUND)
    }

    const updatedProductType = Object.assign(productTypeFound, productType)
    
    return this.productTypesRepository.save(updatedProductType)
  }
}
