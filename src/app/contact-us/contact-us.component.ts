import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private contactService: ContactService, private toastr: ToastrService) {}

  myContactForm!: FormGroup;

  ngOnInit(): void {
    this.myContactForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl(''),
      phone: new FormControl(''),
      message: new FormControl(''),
    });
  }

  onContactSubmit() {

    if (this.myContactForm.invalid) {
      this.toastr.warning('Please enter valid information in all fields.');
      return;
    }
    else {
      const name = this.myContactForm.get('name')?.value;
      const email = this.myContactForm.get('email')?.value;
      const subject = this.myContactForm.get('subject')?.value;
      const phone = this.myContactForm.get('phone')?.value;
      const message = this.myContactForm.get('message')?.value;

      this.contactService.contactUs(name, email, subject, phone, message).subscribe((response: any) => {
        console.log('Upload success:', response);
        this.toastr.success('Email sent successfully!');

        this.myContactForm.reset();
      });
    }
  }

}
