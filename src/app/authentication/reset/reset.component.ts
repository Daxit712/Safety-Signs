import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  newpasswordFieldType: string = 'password';
  conpasswordFieldType: string = 'password';

  myResetForm!: FormGroup;

  confirmMessage: any;

  uidb64;
  token;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.uidb64 = this.route.snapshot.queryParams['uidb64'];
    this.token = this.route.snapshot.queryParams['token'];

    console.log('uidb64', this.uidb64, 'token', this.token);

  }

  newpass() {
    this.newpasswordFieldType = this.newpasswordFieldType === 'password' ? 'text' : 'password';
  }

  conpass() {
    this.conpasswordFieldType = this.conpasswordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.myResetForm = new FormGroup({
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  onResetSubmit() {
    if (this.uidb64 && this.token) {
      const password = this.myResetForm.get('password')?.value;
      const confirmPassword = this.myResetForm.get('confirm_password')?.value;

      if (password === confirmPassword) {
        this.authService.resetPassword(this.uidb64, this.token, password, confirmPassword).subscribe(
          (response) => {
            this.confirmMessage = response.message;
            alert('Password reset successfully')
            this.router.navigate(['login']);
          },
          (error) => {
            this.confirmMessage = 'Something went wrong';
            alert('Something went wrong');
          }
        );
      } else {
        this.confirmMessage = 'Passwords do not match';
        alert('Passwords do not match');
      }
    } else {
      this.confirmMessage = 'Please enter proper credentials';
      alert('Please enter proper credentials');
    }
  }

}
