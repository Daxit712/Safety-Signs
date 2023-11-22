import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  implements OnInit {

  path: any;

  myUploadForm!: FormGroup;

  constructor(private authService: AuthService) {}

  upload($event: any) {
    this.path = $event.target.files[0];
    console.log('this.filename', this.path);

  }

  ngOnInit(): void {
    this.myUploadForm = new FormGroup({
      title: new FormControl(''),
      // document: new FormControl(''),
    });
  }

  onDocSubmit() {
    const title = this.myUploadForm.get('title')?.value;
    // const document = this.myUploadForm.get('document')?.value;

    this.authService.uploadDoc(title, this.path).subscribe((response: any) => {
      console.log('Upload success:', response);
      alert('Upload successfully');
      // if (response.data && response.data.length > 0) {
      //   const firstName = response.data[0].first_name;
      //   const email = response.data[0].email;
      //   console.log('First Name:', firstName);
      //   console.log('Email:', email);
      // }
    });
  }

}
