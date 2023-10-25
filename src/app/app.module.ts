import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { CartComponent } from './cart/cart.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { SlickCarouselModule } from 'node_modules/ngx-slick-carousel'

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegistrationComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    ForgetPasswordComponent,
    AboutUsComponent,
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
    FaqComponent,
    PolicyComponent,
    OurClientsComponent,
    CartComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlickCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
