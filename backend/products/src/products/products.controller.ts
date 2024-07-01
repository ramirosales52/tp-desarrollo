import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<ProductEntity[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpException | ProductEntity> {
    return this.productsService.getProduct(id);
  }

  @Post()
  createUser(
    @Body() newProduct: CreateProductDto,
  ): Promise<HttpException | ProductEntity> {
    return this.productsService.createProduct(newProduct);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }
}
