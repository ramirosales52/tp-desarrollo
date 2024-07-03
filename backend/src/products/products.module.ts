import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeModule } from 'src/product-type/product-type.module';
import { ProductEntity } from './entities/product.entity';
import { ProductTypeService } from 'src/product-type/product-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), 
    ProductTypeModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductTypeService],
})
export class ProductsModule { }
