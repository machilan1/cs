import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './models/responses/login.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InsertUser, PG_CONNECTION } from '@cs/shared';
import { user } from '@cs/shared';
import { eq } from 'drizzle-orm';
import { UsersService } from '@cs/users';
import { LOGIN_FAIL } from './models/errors/auth-error-msg';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
    private configService: ConfigService,
    private jwtService: JwtService,

    private userService: UsersService
  ) {}

  async signUp(signUpDto: InsertUser) {
    try {
      const [a, b] = await Promise.all([
        this.userService.findOntByEmail(signUpDto.email),
        this.userService.findOntByName(signUpDto.name),
      ]);
      if (a || b) {
        throw new Error('註冊失敗');
      }
      const secret = this.encrypt(signUpDto.password);
      const newUser = { ...signUpDto, password: secret } satisfies LoginDto;
      return this.conn.insert(user).values(newUser);
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse | Error> {
    try {
      const [user] = await this.userService.findOntByEmail(loginDto.email);
      if (!user) {
        throw new Error(LOGIN_FAIL);
      }

      const hash = await this.#getUserHash(user.userId);
      if (!hash) {
        throw new Error(LOGIN_FAIL);
      }

      const matches = this.#checkPassword(loginDto.password, hash);
      if (!matches) {
        throw new Error(LOGIN_FAIL);
      }

      const jwt = await this.jwtService.signAsync(user, {
        privateKey: this.configService.get('JWT_SECRET'),
      });
      if (!jwt) {
        throw new Error(LOGIN_FAIL);
      }

      return { jwt };
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  // utilities

  // Get user hash by id
  async #getUserHash(userId: number) {
    const [secret] = await this.conn
      .select({ secret: user.password })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);
    return secret.secret;
  }

  // password encryptor
  encrypt(password: string) {
    const hash = bcrypt.hashSync(
      password,
      +this.configService.get('SALT_ROUND') ?? 12
    );
    return hash;
  }
  //password checker
  #checkPassword(secret: string, hash: string): boolean {
    const res = bcrypt.compareSync(secret, hash);
    return res;
  }

  // jwt validator

  async verifyJwt(token: string) {
    // Todo See what type this function return
    const verified = await this.jwtService.verifyAsync(token);
    return verified;
  }
}
