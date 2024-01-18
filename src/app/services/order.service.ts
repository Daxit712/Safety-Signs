import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }

  addToCartUrl = environment.firebase.apiUrl + 'orders/order_item/create/';
  cartListUrl = environment.firebase.apiUrl + 'orders/order_item/';
  orderedListUrl = environment.firebase.apiUrl + 'orders/'
  orderCreateUrl = environment.firebase.apiUrl + 'orders/create/';
  razorpayUrl = environment.firebase.apiUrl + 'orders/razorpay/';
  successRazorpayUrl = environment.firebase.apiUrl + 'orders/success_and_failed/';


  storeTokens(accessToken: any, refreshToken: any): void {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  addToCart(variant_label: any, quantity: any): Observable<any> {
    const url = this.addToCartUrl;
    const data = {
      variant_label: variant_label,
      quantity: quantity
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.post(url, data, { headers });
  }

  getCartList(): Observable<any> {
    const userUrl = this.cartListUrl; // Use the URL for getting user details
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.get(userUrl, { headers });
  }

  orderdList() {
    const url = this.orderedListUrl; // Use the URL for getting user details
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.get(url, { headers });
  }

  createOrder(order_item: any, total: any) {
    const url = this.orderCreateUrl
    const data = {
      order_item: order_item,
      total: total,
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.post(url, data, { headers });
  }

  razorpay(order_items: any[], total_amount: any) {
    const url = this.razorpayUrl;
    const formData = new FormData();

    order_items.forEach((order) => {
      formData.append('order_item', order);
    });

    formData.append('total_amount', total_amount);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.http.post(url, formData, { headers });
  }

  verifyPaymentSignature(checkoutResponse: any) {
    const url = this.successRazorpayUrl;

    const formData = new FormData();
    formData.append('razorpay_signature', checkoutResponse.razorpay_signature);
    formData.append('razorpay_order_id', checkoutResponse.razorpay_order_id);
    formData.append('razorpay_payment_id', checkoutResponse.razorpay_payment_id);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
    });

    console.log('Verify Payment FormData:', formData);
    console.log('Checkout Response:', checkoutResponse);

    return this.http.post(url, formData, { headers })
      .pipe(
        tap(response => console.log('Verify Payment Response:', response)),
        catchError(error => {
          console.error('Verify Payment Error:', error);
          throw error;
        })
      );
  }


  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }
  _window(): any {
    return window;
  }


}
