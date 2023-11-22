import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  myForgotForm!: FormGroup;
  emailSentMessage: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.myForgotForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  onForgotSubmit() {
    const email = this.myForgotForm.get('email')?.value;

    if(!email) {
      alert('Please enter email!')
    }

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        this.emailSentMessage = response.message;
        alert('Email has been sent!');

      },
      (error) => {
        this.emailSentMessage = 'User does not exist';
      }
    )
  }

}
