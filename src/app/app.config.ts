import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { authTokInterceptor } from './service/auth-tok.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(),withInterceptors([authTokInterceptor])),
  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
