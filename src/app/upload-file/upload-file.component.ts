import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocService } from '../services/doc.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  implements OnInit {

  path: any;
  filesList: any;

  myUploadForm!: FormGroup;

  constructor(private docService: DocService) {}

  upload($event: any) {
    this.path = $event.target.files[0];
    console.log('this.filename', this.path);
  }

  ngOnInit(): void {
    this.myUploadForm = new FormGroup({
      title: new FormControl(''),
    });

    this.docService.uploadDocList().subscribe((res: any) => {
      this.filesList = res.data;
      console.log(this.filesList);
    })
  }

  onDocSubmit() {
    const title = this.myUploadForm.get('title')?.value;

    this.docService.uploadDoc(title, this.path).subscribe((response: any) => {
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

      this.docService.uploadDocList().subscribe((res: any) => {
        this.filesList = res.data;
        console.log(this.filesList);
      })
    },
    (error) => {
      alert('Somethig went wrong!');
    }
    );
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
