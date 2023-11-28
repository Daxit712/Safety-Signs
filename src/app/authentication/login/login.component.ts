import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  email: string = '';

  loginemail: any = '';
  loginpassword: any = '';

  myLoginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  pass() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.myLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
    });
  }

  onLogin() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.myLoginForm.valid) {
      const email = this.myLoginForm.get('email')?.value;
      const password = this.myLoginForm.get('password')?.value;

        this.authService.login(email, password).subscribe(
          (response: any) => {
            if (response) {
              alert('Login Successful');

              this.router.navigate(['/products']);
            }
          },
          (error: any) => {
            console.log('Login error:', error);
            alert('Please enter proper email or password!')
          }

        );

        this.authService.login
    }
    else {
      alert('Please enter proper email and password!')
    }
  }

}
