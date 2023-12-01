import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }

  mainUrl = 'https://safetyforyou.in/api/';

  productListUrl = this.mainUrl + 'products/';
  productDetailUrl = this.mainUrl + 'products/';
  removeProductUrl = this.mainUrl + 'orders/modify/order_item/';
  offerUrl = this.mainUrl + 'orders/offer/';
  reviewUrl = this.mainUrl + 'orders/review_and_ratting/';


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

  getProductList(): Observable<any> {
    const userUrl = this.productListUrl;
    return this.http.get(userUrl);
  }

  getProductDetail(id: any): Observable<any> {
    const userUrl = `${this.productListUrl}${id}/`;

    const accessToken = sessionStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (accessToken) {
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return this.http.get(userUrl, {headers});
  }

  removeProduct(id: any, action: 'removed' | 'quantity' | null, quantity?: any) {
    const url = `${this.removeProductUrl}${id}/`;

    // Conditionally include 'removed' or 'quantity' in the data object
    const data: any = {};
    if (action === 'removed') {
      data['removed'] = true;
    } else if (action === 'quantity' && quantity !== undefined) {
      data['quantity'] = quantity;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.put(url, data, { headers });
  }

  offer(variant_label: any, amount: any) {
    const url = this.offerUrl;
    const data = {
      variant_label: variant_label,
      amount: amount,
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.post(url, data, { headers });
  }

  reviewRating(order_item: any, reviews:any, ratting:any) {
    const url = this.reviewUrl;
    const data = {
      order_item: order_item,
      reviews: reviews,
      ratting: ratting
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.post(url, data, { headers });
  }
}
