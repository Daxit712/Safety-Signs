import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  id: any;
  cartList: any[] = [];
  variantIdDetail: any;
  razorDetails: any;

  orderItemIds: any[] = [];
  totalAmount: any;
  rezorpayRespone: any;
  userData: any;
  orderData: any[] = [];
  productId: any;
  prodcutTotalAmount: any;
  quantity: any;


  ngOnInit(): void {
    let bookingData: any = localStorage.getItem('bookNow');
    bookingData = JSON.parse(bookingData);

    let placeOrderData: any = localStorage.getItem('placeOrder');
    placeOrderData = JSON.parse(placeOrderData);

    console.log('placeOrderData', placeOrderData);

    this.authService.userData$.subscribe(
      (user) => {
        this.userData = user;
        console.log('this.userData', this.userData);

      },
      (error) => {
        console.error('Failed to retrieve user data:', error);
      }
    );


    if (bookingData) {
      this.authService.addToCart(bookingData?.variantId, bookingData?.quantity).subscribe(order => {
        this.orderItemIds = [...this.orderItemIds, order?.data?.id];
        this.totalAmount = order.data.total;
        console.log('this.orderItemIds', this.orderItemIds, 'this.totalAmount', this.totalAmount);

        this.authService.razorpay(this.orderItemIds, this.totalAmount).subscribe(razordetail => {
          this.razorDetails = razordetail;
          console.log('this.razorDetail from check', this.razorDetails);

          const data = bookingData.variant;
          this.orderData.push(data);
          this.productId = bookingData.ids;
          this.prodcutTotalAmount = this.totalAmount;
          console.log('this.orderData', this.orderData);
          console.log('this.prodcutTotalAmount', this.prodcutTotalAmount);
        });
      });
    }
    else if (placeOrderData) {
      this.orderItemIds = placeOrderData.ids;
      this.totalAmount = placeOrderData.total[0];

      this.authService.razorpay(this.orderItemIds, this.totalAmount).subscribe(razordetail => {
        this.razorDetails = razordetail;
        console.log('this.razorDetail from check', this.razorDetails);
      });

      this.orderData = placeOrderData.variants;
      this.productId = placeOrderData.ids;
      this.prodcutTotalAmount = placeOrderData.total[0];
      console.log('this.orderData', this.orderData);
      console.log('this.prodcutTotalAmount', this.prodcutTotalAmount);
    }

    this.ProdcutFunction();
  }

  ProdcutFunction() {
    this.authService.getCartList().subscribe(list => {
      this.cartList = list.data;
      console.log('this.cartList', this.cartList);
    })
  }

  payWithRazorpay() {
    const options: any = {
      key: this.razorDetails.data.RAZORPAY_API_KEY,
      amount: this.razorDetails.data.payment_order.amount,
      order_id: this.razorDetails.data.order_id,
      modal: {
        escape: false,
      },
    };

    options.handler = (response: any, error: any) => {
      options.response = response;
      console.log('response', response);

      if (error) {
        this.router.navigate(['/']);
      } else {
        this.authService
          .verifyPaymentSignature(response)
          .subscribe((response: any) => {
            this.rezorpayRespone = response.data;
            console.log('response.data', this.rezorpayRespone);
          });

        this.authService.createOrder(this.orderItemIds, this.totalAmount).subscribe((data: any) => {
          console.log(data);
          alert('Order created Successfully');
          this.router.navigate(['/products'])
        })
      }
    };

    options.modal.ondismiss = () => {
      alert('cancelled')
      this.router.navigate(['/checkout'])
    }

    const rzp = new this.authService.nativeWindow.Razorpay(options);
    rzp.open()
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
