import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  myForgotForm!: FormGroup;
  emailSentMessage: any;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.myForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onForgotSubmit() {
    const email = this.myForgotForm.get('email')?.value;

    if(!email) {
      this.toastr.warning('Please enter email!');
    }

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        this.emailSentMessage = response.message;
        this.toastr.success('Email has been sent!');

        this.myForgotForm.reset();

      },
      (error) => {
        this.emailSentMessage = 'User does not exist';
      }
    )
  }

}
