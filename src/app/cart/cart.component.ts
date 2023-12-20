import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private productService: ProductService, private orderService: OrderService, private route: ActivatedRoute, private router: Router) {}

  cartList: any[] = [];
  cartList1: any;
  totalPrice: any;
  totalPrice1: any;
  quantity: any;
  quantities: any;
  productId: any;
  productId1: any;

  cartVariantList: any;
  quantity1: any;

  data: any = 1;

  cartEmpty: any;

  removed: any = true;

  ngOnInit(): void {

    this.ProdcutFunction();
  }

  ProdcutFunction() {
    this.orderService.getCartList().subscribe(list => {
      this.cartList = list.data;

      this.totalPrice = this.cartList.filter((a: any) => a.total_price);
      this.totalPrice1 = this.totalPrice.map((a: any) => a.total_price);

      this.productId = this.cartList.filter((a: any) => a.id);
      this.productId1 = this.productId.map((a: any) => a.id);

      this.quantity = {};
      this.cartList.map((item: any) => {
        this.quantity[item.id] = item.quantity || 0;
      });

      this.cartVariantList = this.cartList.map((a: any) => a.variant_label);

      this.quantity1 = this.cartVariantList.stocks;

      this.cartEmpty = this.cartList.length === 1;

      console.log('this.cartList', this.cartList);
      console.log('this.totalPrice1', this.totalPrice1);
      console.log('this.productId', this.productId1);
    })
  }

  increment(item: any) {
    if (this.quantity[item.id] < item.variant_label.stocks) {
      this.quantity[item.id]++;

      const action = 'quantity';
      const updatedQuantity = this.quantity[item.id];
      this.productService.removeProduct(item.id, action, updatedQuantity).subscribe((response: any) => {
        alert('Quantity updated successfully!');
        this.ProdcutFunction();
      });
    }
  }

  decrement(item: any) {
    if (this.quantity[item.id] > 1) {
      this.quantity[item.id]--;

      const action = 'quantity';
      const updatedQuantity = this.quantity[item.id];
      this.productService.removeProduct(item.id, action, updatedQuantity).subscribe((response: any) => {
        alert('Quantity updated successfully!');
        this.ProdcutFunction();
      });
    }
    else {
      const action = this.removed ? 'removed' : 'quantity';

      this.productService.removeProduct(item.id, action).subscribe((a: any) => {
        if (action === 'removed') {
          alert('Your item has been removed successfully!');
        } else if (action === 'quantity') {
          alert('Quantity updated successfully!');
        }

        this.ProdcutFunction();
      });
    }
  }

  // removeProduct(productId: any) {
  //   this.authService.removeProduct(productId, this.remvoed).subscribe((a: any) => {
  //     alert('You item has been removed successfuly!');
  //     this.ProdcutFunction();
  //   })
  // }

  removeProduct(productId: any) {
    const action = this.removed ? 'removed' : 'quantity';

    this.productService.removeProduct(productId, action).subscribe((a: any) => {
      if (action === 'removed') {
        alert('Your item has been removed successfully!');
      } else if (action === 'quantity') {
        alert('Quantity updated successfully!');
      }

      this.ProdcutFunction();
    });
  }

  // onOkClicked(item: any) {
  //   const action = 'quantity';
  //   const updatedQuantity = this.quantity[item.id];
  //   this.authService.removeProduct(item.id, action, updatedQuantity).subscribe((response: any) => {
  //     alert('Quantity updated successfully!');
  //     this.ProdcutFunction();
  //   });
  // }



  redirectToCheckOut() {
    const placeOrder: any = {
      ids: this.productId1,
      total: this.totalPrice1,
      variants: this.cartVariantList,
      quantities: this.quantity,
    }
    localStorage.setItem('placeOrder', JSON.stringify(placeOrder));
    this.router.navigate(['checkout']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
