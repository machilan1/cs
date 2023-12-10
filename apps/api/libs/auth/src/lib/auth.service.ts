import { Injectable } from '@nestjs/common';
import { LoginDto } from './models/dtos/login.dto';
import { LoginResponse } from './models/responses/login.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { DrizzleService } from '@cs/shared';
import { user } from '@cs/shared';
import { eq } from 'drizzle-orm';
import { UsersService } from '@cs/users';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private drizzleService: DrizzleService,
    private userService: UsersService
  ) {}

  // Todo Register

  // Todo Login

  login(loginDto: LoginDto): LoginResponse {
    // getUserFrom amail

    const hash = this.#getUserHash();
    // compare
    const newHash = this.#checkPassword(loginDto.password, hash);

    return { jwt: '' };
  }

  // utilities

  // Todo Get user hash by id
  #getUserHash(userId: number) {
    return this.#db
      .select({ secret: user.password })
      .from(user)
      .where(eq(user.userId, userId));
  }

  // Todo password encryptor
  #encrypt(password: string) {
    const hash = bcrypt.hashSync(
      password,
      +this.configService.get('SALT_ROUND') ?? 12
    );
    return hash;
  }
  //  Todo password checker
  #checkPassword(secret: string, hash: string): boolean {
    const res = bcrypt.compareSync(secret, hash);
    return res;
  }

  // Todo jwt generator

  async #signJwt(payload: SignJwtDto) {
    const res = await this.jwtService.signAsync(payload);
    return res;
  }
  // Todo jwt validator

  async #verifyJwt(token: string) {
    // Todo See what type this function return
    const verified = await this.jwtService.verifyAsync(token);
    return verified;
  }

  #db = (() => {
    if (!this.configService.get('BD_URL')) {
      throw new Error('Database unreachable');
    }
    return this.drizzleService.createDbClient(
      this.configService.get('DB_URL') ?? ''
    );
  })();
}

interface SignJwtDto {
  sub: number;
  username: string;
}
