import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private orderService: OrderService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
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
  quantity: any[] = [];

  paynow: any = false;
  quantities: any;

  totalPrice: any;
  totalPrice1: any;

  cartProductIds: any;
  cartProductIds1: any;

  bookingData: any;
  placeOrderData: any;


  ngOnInit(): void {
    this.bookingData = localStorage.getItem('bookNow');
    this.bookingData = JSON.parse(this.bookingData);

    this.placeOrderData = localStorage.getItem('placeOrder');
    this.placeOrderData = JSON.parse(this.placeOrderData);

    console.log('this.placeOrderData', this.placeOrderData);

    this.authService.userData$.subscribe(
      (user) => {
        this.userData = user;
        console.log('this.userData', this.userData);

      },
      (error) => {
        console.error('Failed to retrieve user data:', error);
      }
    );


    if (this.bookingData) {
      this.orderService.addToCart(this.bookingData?.variantId, this.bookingData?.quantity).subscribe(order => {
        this.orderItemIds = [...this.orderItemIds, order?.data?.id];
        this.totalAmount = order.data.total;
        console.log('this.orderItemIds', this.orderItemIds, 'this.totalAmount', this.totalAmount);

        this.orderService.razorpay(this.orderItemIds, this.totalAmount).subscribe(razordetail => {
          this.razorDetails = razordetail;
          console.log('this.razorDetail from check', this.razorDetails);

          const data = this.bookingData.variant;
          const quan = this.bookingData;
          this.quantity.push(quan);
          this.orderData.push(data);
          this.productId = this.bookingData.ids;
          this.prodcutTotalAmount = this.totalAmount;
          console.log('this.orderData', this.orderData);
          console.log('this.prodcutTotalAmount', this.prodcutTotalAmount);
        });
      });
    }
    else if (this.placeOrderData) {
      this.orderItemIds = this.placeOrderData.ids;
      this.totalAmount = this.placeOrderData.total[0];

      this.orderService.razorpay(this.orderItemIds, this.totalAmount).subscribe(razordetail => {
        this.razorDetails = razordetail;
        console.log('this.razorDetail from check', this.razorDetails);
      },
        (error: any) => {
          console.log('order error:', error);
          this.toastr.error('Sorry, the' + error.error.data.product_name + ' product is currently out of stock.');
        }
      );

      // const data = placeOrderData
      // this.orderData.push(data);
      // this.productId = placeOrderData.ids;
      // this.prodcutTotalAmount = placeOrderData.total[0];
      // console.log('this.orderData', this.orderData);
      // console.log('this.prodcutTotalAmount', this.prodcutTotalAmount);
      // console.log('this.quantity', this.quantity);

      this.orderService.getCartList().subscribe(list => {
        this.cartList = list.data;

        this.totalPrice = this.cartList.filter((a: any) => a.total_price);
        this.totalPrice1 = this.totalPrice.map((a: any) => a.total_price);

        this.cartProductIds = this.cartList.filter((a: any) => a.id);
        this.cartProductIds1 = this.cartProductIds.map((a: any) => a.id);

        console.log('this.cartList', this.cartList);
        console.log('this.cartProductIds1', this.cartProductIds1);

      })
    }
  }

  payWithRazorpay() {

    this.orderService.razorpay(this.orderItemIds, this.totalAmount).subscribe(razordetail => {
      this.razorDetails = razordetail;
      console.log('this.razorDetail from check', this.razorDetails);
    },
      (error: any) => {
        console.log('order error:', error);
        this.toastr.error('Sorry, the' + error.error.data.product_name + ' product is currently out of stock.');
        this.paynow = true
      }
    );
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
        this.orderService
          .verifyPaymentSignature(response)
          .subscribe((response: any) => {
            this.rezorpayRespone = response.data;
            console.log('response.data', this.rezorpayRespone);
          });

        this.orderService.createOrder(this.orderItemIds, this.totalAmount).subscribe((data: any) => {
          console.log(data);
          this.toastr.success('Order created successfully!');
          this.router.navigate(['/ordereds'])
        })
      }
    };

    options.modal.ondismiss = () => {
      this.router.navigate(['/checkout'])
    }

    const rzp = new this.orderService.nativeWindow.Razorpay(options);
    rzp.open()
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
