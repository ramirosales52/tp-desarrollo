import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private productTypesService: ProductTypeService,
  ) {}

  async createProduct(product: CreateProductDto) {
    const productTypeFound = await this.productTypesService.getProductType(
      product.productTypeId,
    );

    if (!productTypeFound) {
      throw new HttpException('Product type not found', HttpStatus.NOT_FOUND);
    }

    const newProduct = this.productRepository.create(product);

    return this.productRepository.save(newProduct);
  }

  getProducts() {
    return this.productRepository.find({
      relations: ['productType'],
    });
  }

  async getProduct(id: number) {
    const productFound = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['productType'],
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return productFound;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = Object.assign(productFound, product);
    return this.productRepository.save(updatedProduct);
  }
}
