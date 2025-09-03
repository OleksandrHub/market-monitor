import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1JEaF1cWWhAYVJ2WmFZfVtgdVVMZV5bRXVPMyBoS35Rc0VqWXxfcHFXR2NUWEN3VEFd');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Ngo9BigBOggjHTQxAR8 / V1JEaF1cWWhAYVJ2WmFZfVtgdVVMZV5bRXVPMyBoS35Rc0VqWXxfcHFXR2NUWEN3VEFd
