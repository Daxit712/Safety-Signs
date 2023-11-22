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

const routes: Routes = [
  {
    path: 'auth', component: AuthenticationComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'change', component: ChangePasswordComponent },
      { path: 'update', component: UpdateProfileComponent },
      { path: 'forget', component: ForgetPasswordComponent },
      { path: 'reset', component: ResetComponent },
    ]
  },
  { path: '', component: HomeComponent },
  { path: 'productlist', component: ProductsListComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'client', component: OurClientsComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'cart', component: CartComponent },
  { path: 'detail/:id', component: ProductDetailsComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
