import { Injectable } from '@nestjs/common';
import { LoginDto } from './models/dtos/login.dto';
import { SignUpDto } from './models/dtos/sign-up.dto';
import { LoginResponse } from './models/responses/login.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { DrizzleService, InsertUser } from '@cs/shared';
import { user } from '@cs/shared';
import { eq } from 'drizzle-orm';
import { UsersService } from '@cs/users';
import {
  BAD_PAYLOAD,
  LOGIN_FAIL,
  USER_NOT_FOUND,
} from './models/errors/error-msg';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private drizzleService: DrizzleService,
    private userService: UsersService
  ) {}
  db = this.drizzleService.createDbClient();

  async signUp(signUpDto: InsertUser) {
    const exists = await this.userService.findOntByEmail(signUpDto.email);

    if (exists) {
      throw new Error('Registration failed');
    }

    const d;

    const secret = this.encrypt(signUpDto.password);

    const newUser = { ...signUpDto, password: secret } satisfies LoginDto;

    return this.db.insert(user).values(newUser);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findOntByEmail(loginDto.email);

    if (!user) {
      console.log(1);
      throw new Error(USER_NOT_FOUND);
    }
    // ! This part is broken password are not encrypted properly.
    const hash = await this.#getUserHash(user.userId);
    if (!hash) {
      console.log(2);
      throw new Error(LOGIN_FAIL);
    }

    const matches = this.#checkPassword(loginDto.password, hash);
    if (!matches) {
      console.log(hash);
      throw new Error(LOGIN_FAIL);
    }

    const jwt = await this.jwtService.signAsync(user);
    if (!jwt) {
      console.log(4);
      throw new Error(LOGIN_FAIL);
    }

    return { jwt };
  }

  // utilities

  // Todo Get user hash by id
  async #getUserHash(userId: number) {
    const [secret] = await this.db
      .select({ secret: user.password })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);
    return secret.secret;
  }

  // Todo password encryptor
  encrypt(password: string) {
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

  // Todo jwt validator

  async verifyJwt(token: string) {
    // Todo See what type this function return
    const verified = await this.jwtService.verifyAsync(token);
    return verified;
  }
}
