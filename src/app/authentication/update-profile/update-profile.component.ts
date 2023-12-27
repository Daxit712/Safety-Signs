import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService, private toastr: ToastrService) {}

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
      this.toastr.warning('Please enter first name.');
      return;
    }

    if (!lastname) {
      this.toastr.warning('Please enter last name.');
      return;
    }

    if (!email) {
      this.toastr.warning('Please enter email.');
      return;
    }

    if (!phone) {
      this.toastr.warning('Please enter phone number.');
      return;
    }

    if (!address) {
      this.toastr.warning('Please enter office address.');
      return;
    }

    if (this.myUpdateForm.valid) {
      const updatedData = this.myUpdateForm.value;
      this.authService.updateUserDetails(updatedData).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.authService.userDataSubject.next(response);
          this.toastr.success('User Details Updated Successful');
        },
        (error) => {
          console.error('User update error:', error);
          this.toastr.error('Please enter proper details!');
        }
      );
    }
  }

}
