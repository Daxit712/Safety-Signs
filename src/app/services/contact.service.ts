import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }

  mainUrl = 'https://safetyforyou.in/api/';

  contactUsUrl = this.mainUrl + 'users/contact_us/';


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

  contactUs(name: any, email:any, subject:any, message:any, phone:any) {
    const url = this.contactUsUrl;
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('phone', phone);

    return this.http.post(url, formData);
  }
}
