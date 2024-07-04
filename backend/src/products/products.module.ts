import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeModule } from 'src/product-type/product-type.module';
import { ProductEntity } from './entities/product.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), 
    AuthModule,
    UsersModule,
    ProductTypeModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AuthGuard],
})
export class ProductsModule { }
