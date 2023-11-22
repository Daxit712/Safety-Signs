import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  // cartList: any;
  // variantId: any;
  // data: any = 0;
  // stocks: any;
  // subTotal: any;
  // totalPrice: any;
  // quantity: any;
  // sellPrice: any;
  // cartProduct: any;
  // cartVariantList: any;
  // cartVariantList1: any;
  // final: any;

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
    // this.route.params.subscribe(params => {
    //   this.variantId = +params['id'];
    //   this.authService.getCartList().subscribe(detail => {
    //     this.cartList = detail.data;
    //     this.cartVariantList = this.cartList.map((a: any) => a.variant_label)
    //     // this.cartVariantList = detail.data[0].variant_label;
    //     // this.cartVariantList = detail.data[0].variant_label.id;
    //     // this.cartVariantList1 = detail.data[0].variant_label.MRP;
    //     this.cartProduct = this.cartVariantList.find((a: any) => a?.id == this.variantId )
    //     // this.quantity = this.cartProduct.stocks;
    //     // if(this.cartVariantList == this.variantId) {
    //     //   this.final = this.cartVariantList1
    //     // }
    //     console.log('this.cartDetail', this.cartList);
    //     console.log('this.yyyy', this.cartVariantList);
    //     console.log('this.final', this.cartProduct);
    //     console.log('this.quantity', this.quantity);

    //   })
    // })

    this.ProdcutFunction();
  }

  ProdcutFunction() {
    this.authService.getCartList().subscribe(list => {
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
      console.log('this.totalPrice', this.totalPrice1);
      console.log('this.productId', this.productId1);
      // console.log('this.quantity', this.quantity);
    })
  }

  increment(item: any) {
    if (this.quantity[item.id] < item.variant_label.stocks) {
      this.quantity[item.id]++;
    }
  }

  decrement(item: any) {
    if (this.quantity[item.id] > 1) {
      this.quantity[item.id]--;
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

    this.authService.removeProduct(productId, action).subscribe((a: any) => {
      if (action === 'removed') {
        alert('Your item has been removed successfully!');
      } else if (action === 'quantity') {
        alert('Quantity updated successfully!');
      }

      this.ProdcutFunction();
    });
  }

  // onOkClicked(item: any) {
  //   const action = 'quantity'; // Assuming you want to update quantity when OK is clicked
  //   this.authService.removeProduct(item, action).subscribe((response: any) => {
  //     // Handle the response or perform any additional actions if needed
  //     alert('Quantity updated successfully!');
  //     this.ProdcutFunction();
  //   });
  // }

  onOkClicked(item: any) {
    const action = 'quantity';
    const updatedQuantity = this.quantity[item.id];
    this.authService.removeProduct(item.id, action, updatedQuantity).subscribe((response: any) => {
      alert('Quantity updated successfully!');
      this.ProdcutFunction();
    });
  }



  redirectToCheckOut() {
    const placeOrder: any = {
      ids: this.productId1,
      total: this.totalPrice1,
      variants: this.cartVariantList
    }
    localStorage.setItem('placeOrder', JSON.stringify(placeOrder));
    this.router.navigate(['checkout']);
  }

}
