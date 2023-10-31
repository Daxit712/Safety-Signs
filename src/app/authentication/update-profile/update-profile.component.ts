import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  myUpdateForm!: FormGroup;
  userData: any = {
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    office_address: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserData().subscribe(
        (user) => {
          this.userData = user?.data;
          this.initializeForm();
        },
        (error) => {
          console.error('Failed to retrieve user data:', error);
        }
      );
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.myUpdateForm = new FormGroup({
      first_name: new FormControl(this.userData.first_name),
      last_name: new FormControl(this.userData.last_name),
      email: new FormControl(this.userData.email),
      phone_no: new FormControl(this.userData.phone_no),
      office_address: new FormControl(this.userData.office_address)
    });
  }

  onUpdate(): void {
    if (this.myUpdateForm.valid) {
      const updatedData = this.myUpdateForm.value;
      this.authService.updateUserDetails(updatedData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
        },
        (error) => {
          console.error('User update error:', error);
        }
      );
    }
  }
}
