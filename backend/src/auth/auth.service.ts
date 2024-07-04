import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { sign, verify } from 'jsonwebtoken';
import { Payload } from 'src/common/interfaces/payload';
import { RegisterDTO } from './dto/register.dto';
import { compareSync, hashSync } from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  
  // config.ts
  config = {
    auth: {
      secret: 'authSecret',
      expiresIn: '1d',
    },
    refresh: {
      secret: 'refreshSecret',
      expiresIn: '1d',
    },
  };
  
  async register(body: RegisterDTO) {
    const userExists = await this.usersService.findByEmail(body.email);

    if(userExists) {
      throw new HttpException('User already exists', 400);
    }

    const user = new UserEntity();
    Object.assign(user, body);

    user.password = hashSync(user.password, 10);

    await this.usersService.createUser(user);
    return user;

  }

  async login(body: LoginDTO) {
    const user = await this.usersService.findByEmailWithPassword(body.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      accessToken: this.generateToken({ email: user.email, role: user.role }, 'auth'),
      refreshToken: this.generateToken({ email: user.email, role: user.role }, 'refresh'),
    };
  }

  generateToken(
    payload: { email: string, role: string},
    type: 'refresh' | 'auth' = 'auth',
  ): string {
    return sign(payload, this.config[type].secret, {
      expiresIn: this.config[type].expiresIn,
    });
  }

  refreshToken(refreshToken: string) {
    try {
      const payload = verify(
        refreshToken,
        this.config.refresh.secret,
      ) as Payload;

      const currentTime = Math.floor(Date.now() / 1000);
      const timeToExpire = (payload.exp - currentTime) / 60;

      if (timeToExpire < 20) {
        return {
          accessToken: this.generateToken({ email: payload.email, role: payload.role}),
          refreshToken: this.generateToken({ email: payload.email, role: payload.role }, 'refresh'),
        };
      }

      return {
        accessToken: this.generateToken({ email: payload.email, role: payload.role}),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getPayload(
    token: string, 
    type: 'refresh' | 'auth' = 'auth'
  ) {
    return verify(token, this.config[type].secret);
  }

}
  