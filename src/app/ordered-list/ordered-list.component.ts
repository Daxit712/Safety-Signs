import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  orderedList: any;

  orderEmpty: any;

  ngOnInit(): void {
    this.orderService.orderdList().subscribe((list: any) => {
      this.orderedList = list.data;

      this.orderEmpty = this.orderedList.length === 0;

      this.orderedList.sort((a: any, b: any) => {
        const dateA = new Date(a.order_item[0]?.variant_label.created_at);
        const dateB = new Date(b.order_item[0]?.variant_label.created_at);

        const isValidDateA = !isNaN(dateA.getTime());
        const isValidDateB = !isNaN(dateB.getTime());

        if (!isValidDateA && !isValidDateB) {
          return 0;
        } else if (!isValidDateA) {
          return 1;
        } else if (!isValidDateB) {
          return -1;
        }

        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
