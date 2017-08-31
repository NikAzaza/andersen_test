import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {InformationComponent} from './information/information.component';
import {CreateProductComponent} from './create-product/create-product.component';

/// <reference types='node' />

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
.bootstrapModule(AppModule)
  .catch(err => console.error(err));
