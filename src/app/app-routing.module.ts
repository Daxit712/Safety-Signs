import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { CartComponent } from './cart/cart.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ResetComponent } from './authentication/reset/reset.component';
import { HomeComponent } from './home/home.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'profile/update', component: UpdateProfileComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'privacy-policy', component: PolicyComponent },
  { path: 'clients', component: OurClientsComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'ordereds', component: OrderedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
