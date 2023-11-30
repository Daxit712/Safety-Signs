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
  filesList: any;

  myUploadForm!: FormGroup;

  constructor(private authService: AuthService) {}

  upload($event: any) {
    this.path = $event.target.files[0];
    console.log('this.filename', this.path);
  }

  ngOnInit(): void {
    this.myUploadForm = new FormGroup({
      title: new FormControl(''),
    });

    this.authService.uploadDocList().subscribe((res: any) => {
      this.filesList = res.data;
      console.log(this.filesList);
    })
  }

  onDocSubmit() {
    const title = this.myUploadForm.get('title')?.value;

    this.authService.uploadDoc(title, this.path).subscribe((response: any) => {
      console.log('Upload success:', response);
      alert('Upload successfully');

      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      this.myUploadForm.reset();

      const modal = document.getElementById('exampleModal');
      if (modal) {
        const modalClosebtn = modal.querySelector('[data-bs-dismiss="modal"]');
        if (modalClosebtn) {
          (modalClosebtn as any).click();
        }
      }

      this.authService.uploadDocList().subscribe((res: any) => {
        this.filesList = res.data;
        console.log(this.filesList);
      })
    },
    (error) => {
      alert('Somethig went wrong!');
    }
    );
  }

}
