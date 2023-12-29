import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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
      this.toastr.warning('Please enter your email address.');
      return;
    }

    if(this.password == '') {
      this.toastr.warning('Please enter your password.');
      return;
    }

    if (this.myLoginForm.valid) {
      const email = this.myLoginForm.get('email')?.value;
      const password = this.myLoginForm.get('password')?.value;

        this.authService.login(email, password).subscribe(
          (response: any) => {
            if (response) {
              this.toastr.success('Login successful! Welcome back!');

              this.router.navigate(['/products']);
            }
          },
          (error: any) => {
            console.log('Login error:', error);
            this.toastr.error('Please enter a valid email address and password.');
          }

        );

        this.authService.login
    }
    else {
      this.toastr.error('Please enter a valid email address and password.');
    }
  }

}
