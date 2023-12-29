import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldpasswordFieldType: string = 'password';
  newpasswordFieldType: string = 'password';
  conpasswordFieldType: string = 'password';

  confirmMessage: any;

  oldpassword: any = '';
  newpassword: any = '';
  confirmpassword: any = '';

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  oldpass() {
    this.oldpasswordFieldType = this.oldpasswordFieldType === 'password' ? 'text' : 'password';
  }

  newpass() {
    this.newpasswordFieldType = this.newpasswordFieldType === 'password' ? 'text' : 'password';
  }

  conpass() {
    this.conpasswordFieldType = this.conpasswordFieldType === 'password' ? 'text' : 'password';
  }

  myChangeForm!: FormGroup;

  ngOnInit(): void {
    this.myChangeForm = new FormGroup({
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      old_password: new FormControl(''),
    });
  }

  onChangeSubmit() {

    if(this.newpassword == '') {
      this.toastr.warning('Please enter your password to proceed.');
      return;
    }

    if(this.oldpassword == '') {
      this.toastr.warning('To proceed, enter your old password.');
      return;
    }

    if(this.confirmpassword == '') {
      this.toastr.warning('To proceed, please provide the confirm password.');
      return;
    }

    const oldPassword = this.myChangeForm.get('old_password')?.value;
    const newPassword = this.myChangeForm.get('password')?.value;
    const confirmPassword = this.myChangeForm.get('confirm_password')?.value;

    if (newPassword === confirmPassword) {
      if (oldPassword !== newPassword) {
        // Continue with the change password logic
        this.authService.changePassword(oldPassword, newPassword, confirmPassword).subscribe(
          (response) => {
            console.log(response.message);
            this.toastr.success('Password changed successfully!');

            this.confirmMessage = '';
            this.myChangeForm.reset();

          },
          (error) => {
            console.log(error);
            this.toastr.error('Oops! Something went wrong.');

          }
        );
      } else {
        this.confirmMessage = 'Old and new passwords should not be the same.*';
      }
    } else {
      this.confirmMessage = 'New and confirm passwords do not match.*';
    }
  }

}
