import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { IMAGE_CONFIG } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    }), withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay()),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeCheck: true,
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      },
    },
  ]
};
