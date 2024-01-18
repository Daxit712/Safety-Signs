import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }

  uploadDocUrl = environment.firebase.apiUrl + 'products/upload_documents/';
  uploadDocListUrl = environment.firebase.apiUrl + 'products/upload_documents/';


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

  uploadDoc(title: any, uploaded_file:any) {
    const url = this.uploadDocUrl;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('uploaded_file', uploaded_file);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.post(url, formData, { headers });
  }

  uploadDocList() {
    const url = this.uploadDocListUrl;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.http.get(url, { headers });
  }
}
