import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './core/infrastructure/config/app.config';
import { AppComponent } from './presentation/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
