import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {ProductsComponent} from "./components/products/products/products.component";
import {HttpClientModule} from "@angular/common/http";
import {WebService} from "./web.service";
import { RouterModule} from "@angular/router";
import { HomeComponent} from './components/home/home.component';
import {ProductComponent} from "./components/products/product/product.component";
import { AuthModule } from "@auth0/auth0-angular";
import {HeaderComponent} from "./components/header/header.component";
import {HeroComponent} from "./components/hero/hero.component";
import { FooterComponent } from './components/footer/footer.component';


var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductComponent,
    HeroComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-m1vbm7mjkcjugfu4.uk.auth0.com',
      clientId: '6ewpgmsKYgAkHE7cJDXckJMjfKZs82Qv'
    })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
