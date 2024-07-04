import { Controller, Get, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.USER)
@Controller('product-types')
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) { }

  @Post()
  createProductType(@Body() productType: CreateProductTypeDto) {
    return this.productTypeService.createProductType(productType)
  }

  @Put(':id')
  updateProductType(@Param('id', ParseIntPipe) id: number, @Body() productType: UpdateProductTypeDto) {
    return this.productTypeService.updateProductType(id, productType)
  }

  @Get()
  getProductTypes() {
    return this.productTypeService.getProductTypes()
  }

  @Get(':id')
  getProductType(@Param('id', ParseIntPipe) id: number) {
    return this.productTypeService.getProductType(id)
  }

}
