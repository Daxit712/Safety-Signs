import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  tabopen1 = true;
  tabopen2 = true;
  tabopen3 = true;

  open(i: any) {
    switch (i) {
      case 1:
        this.tabopen1 = !this.tabopen1;
        break;
      case 2:
        this.tabopen2 = !this.tabopen2;
        break;
      case 3:
        this.tabopen3 = !this.tabopen3;
        break;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
