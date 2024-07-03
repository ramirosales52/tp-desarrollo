import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProductsModule } from './products/products.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { AuthModule } from './auth/auth.module';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'db.sql',
      type: 'sqlite',
      synchronize: true,
      entities,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    ProductTypeModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
