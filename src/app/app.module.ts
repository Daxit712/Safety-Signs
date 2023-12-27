import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ResetComponent } from './authentication/reset/reset.component';
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

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment'
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { SlickCarouselModule } from 'node_modules/ngx-slick-carousel';
import { HomeComponent } from './home/home.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { StarRatingModule } from 'angular-star-rating';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ProductDetailsComponent,
    ResetComponent,
    HomeComponent,
    UploadFileComponent,
    CheckoutComponent,
    OrderedListComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
