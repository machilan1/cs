import { Injectable, inject } from '@angular/core';
import exp from 'constants';
import { AuthService } from '../../shared/src/lib/services/auth.service';

@Injectable()
export class AuthStateService {
  private authService = inject(AuthService);

  login() {}
}
