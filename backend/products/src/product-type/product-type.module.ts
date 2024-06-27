import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesEntity } from 'src/entities/productType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypesEntity])
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [ProductTypeService]
})
export class ProductTypeModule { }
