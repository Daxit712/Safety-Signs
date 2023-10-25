import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navopen = false;
  navopen1 = false;

  opendrop() {
    this.navopen = !this.navopen
  }

  opentogle() {
    this.navopen1 = !this.navopen1
  }

}
