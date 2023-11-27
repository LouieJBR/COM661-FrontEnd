import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ProductsComponent} from "./products/product.component";
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    ProductsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
