import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  //   if (this.isLoggedIn()) {
  //     this.getUserDetails().subscribe((user) => {
  //       this.userDataSubject.next(user?.data);
  //     });
  //   }
  // }

  // mainUrl = 'https://safetyforyou.in/api/';

  // loginUrl = this.mainUrl + 'token/';
  // registerUrl = this.mainUrl + 'users/registration/';
  // updateUrl = this.mainUrl + 'users/user/detail/';
  // forgotUrl = this.mainUrl + 'users/forgot/password/';
  // resetPasswordUrl = this.mainUrl + 'users/forgot/password/';
  // changePasswordUrl = this.mainUrl + 'users/change/password/';

  // userDataSubject = new BehaviorSubject<any>(null);
  // userData$ = this.userDataSubject.asObservable();

  // loginDataResponse = new BehaviorSubject<any>(null);
  // loginData$ = this.loginDataResponse.asObservable();



  // productListUrl = this.mainUrl + 'products/';
  // productDetailUrl = this.mainUrl + 'products/';
  // removeProductUrl = this.mainUrl + 'orders/modify/order_item/';
  // offerUrl = this.mainUrl + 'orders/offer/';
  // reviewUrl = this.mainUrl + 'orders/review_and_ratting/';

  // addToCartUrl = this.mainUrl + 'orders/order_item/create/';
  // cartListUrl = this.mainUrl + 'orders/order_item/';
  // orderedListUrl = this.mainUrl + 'orders/'
  // orderCreateUrl = this.mainUrl + 'orders/create/';
  // razorpayUrl = this.mainUrl + 'orders/razorpay/';
  // successRazorpayUrl = this.mainUrl + 'orders/success_and_failed/';

  // uploadDocUrl = this.mainUrl + 'products/upload_documents/';
  // uploadDocListUrl = this.mainUrl + 'products/upload_documents/';

  // contactUsUrl = this.mainUrl + 'users/contact_us/';

  // registerUser(userData: any): Observable<any> {
  //   return this.http.post(this.registerUrl, userData);
  // }

  // login(email: any, password: any): any {
  //   const credentials = {
  //     email,
  //     password
  //   };

  //   return this.http.post(this.loginUrl, credentials).pipe(map((res: any) => {
  //     if (res.access && res.refresh) {
  //       const accessToken = res.access;
  //       const refreshToken = res.refresh;

  //       console.log('Access Token:', accessToken);
  //       console.log('Refresh Token:', refreshToken);

  //       this.storeTokens(accessToken, refreshToken);
  //       this.getUserDetails().subscribe((user) => {
  //         this.userDataSubject.next(user?.data);
  //       });
  //       return res;
  //     }
  //   }))
  // }

  // refreshToken(refreshToken: any): Observable<any> {
  //   const data = {
  //     refresh: refreshToken
  //   };

  //   return this.http.post(this.loginUrl, data);
  // }

  // storeTokens(accessToken: any, refreshToken: any): void {
  //   sessionStorage.setItem('access_token', accessToken);
  //   sessionStorage.setItem('refresh_token', refreshToken);
  // }

  // clearTokens(): void {
  //   sessionStorage.removeItem('access_token');
  //   sessionStorage.removeItem('refresh_token');
  // }

  // isLoggedIn(): boolean {
  //   const accessToken = sessionStorage.getItem('access_token');
  //   return !!accessToken;
  // }

  // updateUserDetails(userData: any): Observable<any> {
  //   const userUrl = this.updateUrl;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.put(userUrl, userData, { headers });
  // }

  // forgotPassword(email: any): Observable<any> {
  //   const data = {
  //     email: email
  //   }
  //   return this.http.post(this.forgotUrl, data);
  // }

  // resetPassword(uidb64: any, token: any, password: any, confirmPassword: any): Observable<any> {
  //   const url = `${this.resetPasswordUrl}${uidb64}/${token}`;

  //   const data = {
  //     password: password,
  //     confirm_password: confirmPassword,
  //   };

  //   return this.http.post(url, data);
  // }

  // changePassword(oldPassword: any, newPassword: any, confirmPassword: any): Observable<any> {
  //   const url = this.changePasswordUrl;
  //   const data = {
  //     old_password: oldPassword,
  //     password: newPassword,
  //     confirm_password: confirmPassword,
  //   };

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.put(url, data, { headers });
  // }

  // getUserDetails(): Observable<any> {
  //   const userUrl = this.updateUrl; // Use the URL for getting user details
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.get(userUrl, { headers });
  // }

  // getProductList(): Observable<any> {
  //   const userUrl = this.productListUrl;
  //   return this.http.get(userUrl);
  // }

  // getProductDetail(id: any): Observable<any> {
  //   const userUrl = `${this.productListUrl}${id}/`;

  //   const accessToken = sessionStorage.getItem('access_token');
  //   let headers = new HttpHeaders();
  //   if (accessToken) {
  //     headers = headers.set('Authorization', `Bearer ${accessToken}`);
  //   }
  //   return this.http.get(userUrl, {headers});
  // }

  // addToCart(variant_label: any, quantity: any): Observable<any> {
  //   const url = this.addToCartUrl;
  //   const data = {
  //     variant_label: variant_label,
  //     quantity: quantity
  //   };

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.post(url, data, { headers });
  // }

  // getCartList(): Observable<any> {
  //   const userUrl = this.cartListUrl; // Use the URL for getting user details
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.get(userUrl, { headers });
  // }

//   verifyPaymentSignature(checkoutResponse: any) {
//     const url = this.successRazorpayUrl;

//     const formData = new FormData();
//     formData.append('razorpay_signature', checkoutResponse.razorpay_signature);
//     formData.append('razorpay_order_id', checkoutResponse.razorpay_order_id);
//     formData.append('razorpay_payment_id', checkoutResponse.razorpay_payment_id);

//     const headers = new HttpHeaders({
//         'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
//     });

//     console.log('Verify Payment FormData:', formData);
//     console.log('Checkout Response:', checkoutResponse);

//     return this.http.post(url, formData, { headers })
//         .pipe(
//             tap(response => console.log('Verify Payment Response:', response)),
//             catchError(error => {
//                 console.error('Verify Payment Error:', error);
//                 throw error;
//             })
//         );
// }


//   get nativeWindow(): any {
//     if (isPlatformBrowser(this.platformId)) {
//       return this._window();
//     }
//   }
//   _window(): any {
//     return window;
//   }

  // offer(variant_label: any, amount: any) {
  //   const url = this.offerUrl;
  //   const data = {
  //     variant_label: variant_label,
  //     amount: amount,
  //   };

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.post(url, data, { headers });
  // }

  // razorpay(order_items: any[], total_amount: any) {
  //   const url = this.razorpayUrl;
  //   const formData = new FormData();

  //   order_items.forEach((order) => {
  //     formData.append('order_item', order);
  //   });

  //   formData.append('total_amount', total_amount);

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });
  //   return this.http.post(url, formData, { headers });
  // }

  // createOrder(order_item: any, total: any) {
  //   const url = this.orderCreateUrl
  //   const data = {
  //     order_item: order_item,
  //     total: total,
  //   }
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.post(url, data, { headers });
  // }

  // reviewRating(order_item: any, reviews:any, ratting:any) {
  //   const url = this.reviewUrl;
  //   const data = {
  //     order_item: order_item,
  //     reviews: reviews,
  //     ratting: ratting
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.post(url, data, { headers });
  // }

  // removeProduct(id: any, removed: any) {
  //   const url = `${this.removeProductUrl}${id}/`;
  //   const data = {
  //     removed: removed
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.put(url, data, { headers });
  // }

  // removeProduct(id: any, action: 'removed' | 'quantity' | null, quantity?: any) {
  //   const url = `${this.removeProductUrl}${id}/`;

  //   // Conditionally include 'removed' or 'quantity' in the data object
  //   const data: any = {};
  //   if (action === 'removed') {
  //     data['removed'] = true;
  //   } else if (action === 'quantity' && quantity !== undefined) {
  //     data['quantity'] = quantity;
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.put(url, data, { headers });
  // }

  // uploadDoc(title: any, uploaded_file:any) {
  //   const url = this.uploadDocUrl;
  //   const formData = new FormData();

  //   formData.append('title', title);
  //   formData.append('uploaded_file', uploaded_file);

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.post(url, formData, { headers });
  // }

  // orderdList() {
  //   const url = this.orderedListUrl; // Use the URL for getting user details
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.get(url, { headers });
  // }

  // contactUs(name: any, email:any, subject:any, message:any, phone:any) {
  //   const url = this.contactUsUrl;
  //   const formData = new FormData();

  //   formData.append('name', name);
  //   formData.append('email', email);
  //   formData.append('subject', subject);
  //   formData.append('message', message);
  //   formData.append('phone', phone);

  //   return this.http.post(url, formData);
  // }

  // uploadDocList() {
  //   const url = this.uploadDocListUrl;

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  //   });

  //   return this.http.get(url, { headers });
  // }

}
