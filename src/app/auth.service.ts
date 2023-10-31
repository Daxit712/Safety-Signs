import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  mainUrl = 'http://safety-signs.ap-south-1.elasticbeanstalk.com/api/';

  loginUrl = this.mainUrl + 'token/';
  registerUrl = this.mainUrl + 'users/registration/';
  updateUrl = this.mainUrl + 'users/user/detail/1/'

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(email: any, password: any): Observable<any> {
    const credentials = {
      email,
      password
    };

    return this.http.post(this.loginUrl, credentials);
  }

  refreshToken(refreshToken: any): Observable<any> {
    const data = {
      refresh: refreshToken
    };

    return this.http.post(this.loginUrl, data);
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
    // Check if the access token is present in sessionStorage to determine if the user is logged in.
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  getUserData(): Observable<any> {
    // Implement the logic to fetch user data from your API.
    const userUrl = this.mainUrl + 'users/user/detail/1/';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.get(userUrl, { headers });
  }

  updateUserDetails(userData: any): Observable<any> {
    // Implement the logic to update user data in your API.
    const userUrl = this.mainUrl + 'users/user/detail/1/';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.put(userUrl, userData, { headers });
  }

}
