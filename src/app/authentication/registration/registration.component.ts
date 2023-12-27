import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  passwordFieldType: string = 'password';
  password: string = '';

  myForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  pass() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      phone_no: new FormControl(''),
      office_address: new FormControl(''),
    });
  }

  onSubmit() {

    if (this.myForm.invalid) {
      this.toastr.warning('Please Enter Required fields.');
      return;
    }

    const userData = this.myForm.value;

    this.authService.registerUser(userData).subscribe(
      (response: any) => {
        if(response) {
          console.log('Registration success:', response);
          this.toastr.success('Registration Successfully');

          const email = this.myForm.get('email')?.value;
          const password = this.myForm.get('password')?.value;

          this.authService.login(email, password).subscribe(
            (response: any) => {
              if (response) {
                this.router.navigate(['/products']);
              }
            },
            (error: any) => {
              console.log('Login error:', error);
              this.toastr.error(error);
            }

          );
        }
      },
      (error: any) => {
        console.log('registration error:', error);
        this.toastr.error(error.error.message);
      }
    );
  }

}
