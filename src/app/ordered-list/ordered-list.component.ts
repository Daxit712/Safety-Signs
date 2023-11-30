import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  constructor(private authService: AuthService) {}

  orderedList: any;

  orderEmpty: any;

  ngOnInit(): void {
    this.authService.orderdList().subscribe((list: any) => {
      this.orderedList = list.data;

      this.orderEmpty = this.orderedList.length === 0;

      this.orderedList.sort((a: any, b: any) => {
        const dateA = new Date(a.order_item[0]?.variant_label.created_at);
        const dateB = new Date(b.order_item[0]?.variant_label.created_at);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

}
