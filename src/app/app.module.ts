import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { NgxBarcodeModule } from 'ngx-barcode';
import { AppComponent } from './app.component';
// import { AppBarcodeComponent } from './app-barcode';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, JsonpModule, HttpClientModule, NgxBarcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
