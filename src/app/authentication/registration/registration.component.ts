import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  passwordFieldType: string = 'password';
  password: string = '';

  myForm!: FormGroup;

  constructor(private authService: AuthService) {}

  pass() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      first_name: new FormControl(''), // Match the key "first_name"
      last_name: new FormControl(''),  // Match the key "last_name"
      email: new FormControl(''),      // Match the key "email"
      password: new FormControl(''),
      phone_no: new FormControl(''),   // Match the key "phone_no"
      office_address: new FormControl(''),
    });
  }

  onSubmit() {
    const userData = this.myForm.value;

    this.authService.registerUser(userData).subscribe((response: any) => {
      console.log('Registration success:', response);
      if (response.data && response.data.length > 0) {
        const firstName = response.data[0].first_name;
        const email = response.data[0].email;
        console.log('First Name:', firstName);
        console.log('Email:', email);
      }
    });
  }
}
