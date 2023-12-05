import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
import { FooterComponent } from './components/footer/footer.component';
import { ProductByTypeComponent } from './components/products/productByType/productByType.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CustomOrdersComponent } from './components/custom-orders/custom-orders.component';


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
  },{
    path: 'products/type/:productType',
    component: ProductByTypeComponent
  },{
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    ProductByTypeComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    WishlistComponent,
    CustomOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
