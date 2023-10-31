import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navopen = false;
  navopen1 = false;

  constructor(private auth: AuthService){
  }

  get loggedIn(): any {
    // Check if the access token is present in local storage to determine if the user is logged in.
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  get update(): any {
    // Check if the access token is present in local storage to determine if the user is logged in.
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  opendrop() {
    this.navopen = !this.navopen
  }

  opentogle() {
    this.navopen1 = !this.navopen1
  }

  logout() {
    this.auth.clearTokens();
  }

}
