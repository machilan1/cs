import { Injectable, inject } from '@angular/core';
import exp from 'constants';
import { AuthService } from '../../shared/src/lib/services/auth.service';
import { Login$Params } from '../../shared/src/lib/fn/auth/login';
import { LoginDto } from '../../shared/src/lib/models/login-dto';
import { SignUpDto } from '../../shared/src/lib/models/sign-up-dto';
import { firstValueFrom } from 'rxjs';
import { injectMutation } from '@ngneat/query';

@Injectable()
export class AuthStateService {
  private authService = inject(AuthService);
  #mutation = injectMutation();

  async login(secret: LoginDto) {
    return this.#mutation({
      mutationFn: () => this.authService.login({ body: secret }),
      onSuccess: ({ jwt }) => {
        localStorage.setItem('token', jwt);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }

  register(secret: SignUpDto) {
    return this.#mutation({
      mutationFn: () => this.authService.register({ body: secret }),
      onSuccess: () => {
        // Todo Route maybe?
        console.log('Login success');
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }
}
