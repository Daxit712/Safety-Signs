import { Component, OnInit, HostListener, HostBinding, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Failed to retrieve user data:', error);
      }
    );
  }

  // @HostBinding('class.open') isDropdownOpen = false;

  // @HostBinding('attr.id') id = 'open1';
  // @HostBinding() isToggle = false;

  // @HostListener('click') toggleOpen() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  // @HostListener('click') toggleOpen1() {
  //   this.isToggle = !this.isToggle;
  // }

  // @HostListener('click') onClick() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  //   this.toggleDropdown();
  // }

  // @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  // toggleDropdown() {
  //   const isCollapsed = this.navbarCollapse.nativeElement.classList.contains('show');

  //   if (isCollapsed) {
  //     this.renderer.removeClass(this.navbarCollapse.nativeElement, 'show');
  //   } else {
  //     this.renderer.addClass(this.navbarCollapse.nativeElement, 'show');
  //   }
  // }

  // navopen = false;

  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  navopen = false;

  open() {
    this.navopen = !this.navopen
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!(event.target as HTMLElement).closest('app-navbar')) {
      if (this.navopen) {
        this.navopen = false;
      }
    }
  }

  get loggedIn(): any {
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  get update(): any {
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  logout() {
    this.authService.clearTokens();
  }

}
