import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  oldpasswordFieldType: string = 'password';
  oldpassword: string = '';

  newpasswordFieldType: string = 'password';
  newpassword: string = '';

  conpasswordFieldType: string = 'password';
  conpassword: string = '';

  oldpass() {
    this.oldpasswordFieldType = this.oldpasswordFieldType === 'password' ? 'text' : 'password';
  }

  newpass() {
    this.newpasswordFieldType = this.newpasswordFieldType === 'password' ? 'text' : 'password';
  }

  conpass() {
    this.conpasswordFieldType = this.conpasswordFieldType === 'password' ? 'text' : 'password';
  }

}
