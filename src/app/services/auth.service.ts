import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    if (this.isLoggedIn()) {
      this.getUserDetails().subscribe((user) => {
        this.userDataSubject.next(user?.data);
      });
    }
  }

  loginUrl = environment.firebase.apiUrl + 'token/';
  registerUrl = environment.firebase.apiUrl + 'users/registration/';
  updateUrl = environment.firebase.apiUrl + 'users/user/detail/';
  forgotUrl = environment.firebase.apiUrl + 'users/forgot/password/';
  resetPasswordUrl = environment.firebase.apiUrl + 'users/forgot/password/';
  changePasswordUrl = environment.firebase.apiUrl + 'users/change/password/';

  userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  loginDataResponse = new BehaviorSubject<any>(null);
  loginData$ = this.loginDataResponse.asObservable();


  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(email: any, password: any): any {
    const credentials = {
      email,
      password
    };

    return this.http.post(this.loginUrl, credentials).pipe(map((res: any) => {
      if (res.access && res.refresh) {
        const accessToken = res.access;
        const refreshToken = res.refresh;

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        this.storeTokens(accessToken, refreshToken);
        this.getUserDetails().subscribe((user) => {
          this.userDataSubject.next(user?.data);
        });
        return res;
      }
    }))
  }

  refreshToken(refreshToken: any): Observable<any> {
    const data = {
      refresh: refreshToken
    };

    return this.http.post(this.loginUrl, data);
  }

  updateUserDetails(userData: any): Observable<any> {
    const userUrl = this.updateUrl;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.put(userUrl, userData, { headers });
  }

  getUserDetails(): Observable<any> {
    const userUrl = this.updateUrl; // Use the URL for getting user details
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.get(userUrl, { headers });
  }

  forgotPassword(email: any): Observable<any> {
    const data = {
      email: email
    }
    return this.http.post(this.forgotUrl, data);
  }

  resetPassword(uidb64: any, token: any, password: any, confirmPassword: any): Observable<any> {
    const url = `${this.resetPasswordUrl}${uidb64}/${token}`;

    const data = {
      password: password,
      confirm_password: confirmPassword,
    };

    return this.http.post(url, data);
  }

  changePassword(oldPassword: any, newPassword: any, confirmPassword: any): Observable<any> {
    const url = this.changePasswordUrl;
    const data = {
      old_password: oldPassword,
      password: newPassword,
      confirm_password: confirmPassword,
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.put(url, data, { headers });
  }

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
}
