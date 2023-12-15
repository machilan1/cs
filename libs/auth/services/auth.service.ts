import { Injectable, inject } from '@angular/core';
import exp from 'constants';
import { AuthService } from '../../shared/src/lib/services/auth.service';
import { Login$Params } from '../../shared/src/lib/fn/auth/login';
import { LoginDto } from '../../shared/src/lib/models/login-dto';
import { SignUpDto } from '../../shared/src/lib/models/sign-up-dto';
import {
  catchError,
  firstValueFrom,
  map,
  of,
  retry,
  retryWhen,
  share,
} from 'rxjs';
import { injectMutation, injectQuery } from '@ngneat/query';
import { TokenExpiredError } from 'jsonwebtoken';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private authService = inject(AuthService);
  #mutation = injectMutation();
  #query = injectQuery();

  // TODO: check if invalideQuery is useful
  userResult$ = this.#query({
    queryKey: ['me'],
    queryFn: () =>
      this.authService.findMe().pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            return of(null);
          }
          throw err;
        }),
      ),
    staleTime: Infinity,
  }).result$.pipe(share());

  login() {
    return this.#mutation({
      mutationFn: (secret: LoginDto) =>
        this.authService.login({ body: secret }),
      onSuccess: ({ jwt }) => {
        localStorage.setItem('token', jwt);
        alert('Login success');
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }

  register(secret: SignUpDto) {
    return this.#mutation({
      mutationFn: (credential: SignUpDto) =>
        this.authService.register({ body: credential }),
      onSuccess: () => {
        // Todo Route maybe?
        console.log('Login success');
      },
      onError: (err) => {
        console.log(err);
      },
    }).mutateAsync(secret);
  }
}
