import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signuUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ status: string }> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ status: string; token: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({
      username,
    });
    const checkPassword = await bcrypt.compare(password, user.password);
    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    if (user && checkPassword) {
      return {
        status: 'Logged in successfully',
        token,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
