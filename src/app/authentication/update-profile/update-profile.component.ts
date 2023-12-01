import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
      this.authService.userData$.subscribe(
        (user) => {
          this.userData = user;
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
      email: new FormControl(this.userData.email, [Validators.required, Validators.email]),
      phone_no: new FormControl(this.userData.phone_no, [Validators.required, Validators.pattern(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/)]),
      office_address: new FormControl(this.userData.office_address)
    });


  }

  onUpdate(): void {

    const firstname = this.myUpdateForm.get('first_name')?.value;
    const lastname = this.myUpdateForm.get('last_name')?.value;
    const email = this.myUpdateForm.get('email')?.value;
    const phone = this.myUpdateForm.get('phone_no')?.value;
    const address = this.myUpdateForm.get('office_address')?.value;

    if (!firstname) {
      alert('Please enter first name.');
      return;
    }

    if (!lastname) {
      alert('Please enter last name.');
      return;
    }

    if (!email) {
      alert('Please enter email.');
      return;
    }

    if (!phone) {
      alert('Please enter phone number.');
      return;
    }

    if (!address) {
      alert('Please enter office address.');
      return;
    }

    if (this.myUpdateForm.valid) {
      const updatedData = this.myUpdateForm.value;
      this.authService.updateUserDetails(updatedData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.authService.userDataSubject.next(response);
          alert('User Details Updated Successful');
        },
        (error) => {
          console.error('User update error:', error);
          alert('Please enter proper details!');
        }
      );
    }
  }
}
