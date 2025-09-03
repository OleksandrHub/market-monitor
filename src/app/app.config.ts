import { ApplicationConfig, ApplicationRef, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CandleSeriesService, CategoryService, ChartAllModule, ChartModule, TooltipService, ZoomService } from '@syncfusion/ej2-angular-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ChartModule),
    CandleSeriesService,
    CategoryService,
    TooltipService,
    ZoomService
  ]
};
