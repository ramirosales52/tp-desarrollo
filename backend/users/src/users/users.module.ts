import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
     TypeOrmModule.forFeature([UserEntity]),
    JwtModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
