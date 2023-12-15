import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideQueryDevTools } from '@ngneat/query-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiConfiguration } from 'libs/shared/src/lib/api-configuration';
import { authInterceptor } from '../../../../libs/auth/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideQueryDevTools(),

    {
      provide: ApiConfiguration,
      useValue: {
        rootUrl: 'http://localhost:3000',
      },
    },
  ],
};
