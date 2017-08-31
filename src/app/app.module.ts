import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, ValueProvider } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner/barcodescanner.common';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';



export function createBarcodeScanner() {
  return new BarcodeScanner();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, JsonpModule, HttpClientModule, RouterModule
  ],
  providers: [ { provide: BarcodeScanner, useFactory: (createBarcodeScanner) }],
  bootstrap: [AppComponent]
})
export class AppModule { }
