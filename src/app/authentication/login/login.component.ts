import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordFieldType: string = 'password';
  password: string = '';

  loginemail: any = '';
  loginpassword: any = '';

  myLoginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  pass() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.myLoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogin() {
    if (this.myLoginForm.valid) {
      const email = this.myLoginForm.get('email')?.value;
      const password = this.myLoginForm.get('password')?.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle the response here, typically storing tokens in local storage or a service.
          const accessToken = response.access;
          const refreshToken = response.refresh;

          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);

          // Store tokens in local storage
          this.authService.storeTokens(accessToken, refreshToken);

          this.router.navigate(['/']);
          // Redirect or perform any other actions after successful login
        },
        (error) => {
          console.log('Login error:', error);
          // Handle login error, e.g., display an error message on the form.
        }
      );
    }
  }

}
