import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  repository = UserEntity;
  constructor(private jwtService: JwtService) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  async canDo(user: UserI, permission: string) {}

  async register(body: RegisterDTO) {
    const userExists = await this.findByEmail(body.email);

      if(userExists) {
        throw new HttpException('El usuario ya existe', 400);
      }

    const user = new UserEntity();
    Object.assign(user, body);

    user.password = hashSync(user.password, 10);

    await this.repository.save(user);
    return user;

  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.generateToken({ email: user.email, role: user.role }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email, role: user.role }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOneBy({ email });
  }
}
