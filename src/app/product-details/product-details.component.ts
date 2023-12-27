import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  data: any = 1;
  id: any;
  productDetail: any;
  rating = 0;
  stocks: any;
  addedToCart: boolean = false;
  selectedVariant: any;
  ratingAvailability: any;

  offerbtn: any;

  myOfferForm!: FormGroup;

  ratingForm!: FormGroup;
  userId: any;

  ratingId: any;

  avgRating: any;

  allReviews: any

  constructor(private authService: AuthService, private productService: ProductService, private orderService: OrderService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  bindingsForm!: FormGroup;

  ngOnInit(): void {
    localStorage.removeItem('bookNow');

    this.authService.userData$.subscribe(
      (user) => {
        this.userId = user?.id;
        console.log('this.userData', this.userId);

      },
      (error) => {
        console.error('Failed to retrieve user data:', error);
      }
    );

    this.setupForm();

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productService.getProductDetail(this.id).subscribe(detail => {
        this.productDetail = detail.data;
        this.stocks = this.productDetail.variants[0];
        this.selectedVariant = this.productDetail.variants[0];

        this.allReviews = this.productDetail.variants[0];

        this.ratingAvailability = this.productDetail.variants[0].rating_and_review.find((a:any) => a.rating_availability);

        this.avgRating = this.productDetail.variants[0].rating_and_review.find((a:any) => a.avg_ratting)?.avg_ratting || 0;

        this.ratingId = this.productDetail.variants[0].rating_and_review.find((a:any) => a.user_id == this.userId);

        console.log('this.stocks', this.stocks);
        console.log('this.productDetail', this.productDetail);
        console.log('this.selectedVariant', this.selectedVariant);
        console.log('this.selectedVariant1', this.ratingAvailability);
        console.log('this.ratingId', this.ratingId);
        console.log('this.avgRating', this.avgRating);
        console.log('this.allReviews', this.allReviews);

      })
    });

    this.myOfferForm = new FormGroup({
      amount: new FormControl('')
    });

    this.ratingForm = new FormGroup({
      reviewInput: new FormControl(''),
      ratingInput: new FormControl(''),
    });

  }


  setupForm() {
    this.bindingsForm = this.fb.group({
      id: ['10'],
      rating: [this.avgRating],
      readOnly: [true],
    });
  }

  increment() {
    if(this.data < this.selectedVariant.stocks) {
      this.data = this.data + 1;
    }
  }

  decrement() {
    if (this.data === 1) {
      return;
    }
    this.data = this.data - 1;
  }

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, "arrows": true, "dots": true, "infinite": true,};

  slideConfig1 = {"slidesToShow": 4, "slidesToScroll": 1, "arrows": true, "dots": true, "infinite": true,};

  handleMouseover(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    if (target && target.classList.contains('carouselimg')) {
      const largeImage = document.getElementById('largeImage') as HTMLImageElement;
      largeImage.src = target.src;
      largeImage.style.display = 'block';
    }
  }

  handleMouseover1(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    if (target && target.classList.contains('carouselimg1')) {
      const largeImage = document.getElementById('largeImage1') as HTMLImageElement;
      largeImage.src = target.src;
      largeImage.style.display = 'block';
    }
  }

  modalOpen(){
    const carouselBody = document.getElementById('modalCarousel') as any;
    const nextButton = carouselBody.querySelector('.slick-next');
    nextButton.click();
  }

  get loggedIn(): any {
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }

  goToCartPage(selectedVariantId: any) {
    if (this.addedToCart) {
      this.router.navigate(['/cart', selectedVariantId]);
    } else {
      this.orderService.addToCart(selectedVariantId, this.data).subscribe(
        (response) => {
          console.log(response.message);
          alert('Add to cart Successfully');
          this.addedToCart = true;
          setTimeout(() => {
            this.addedToCart = false;
          }, 2000);

          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  selectVariant(variant: any) {
    console.log('variant', variant);

    this.selectedVariant = variant;
  }

  goToCheckOut(productId: any) {

    this.orderService.addToCart(productId, this.data).subscribe(
      (response) => {
        console.log('response.message', response.message);
        alert('Add to cart Successfully');
        this.addedToCart = true;
        const bookNow: any = {
          quantity: this.data,
          variantId: productId,
          variant: this.selectedVariant
        }
        localStorage.setItem('bookNow', JSON.stringify(bookNow));
        this.router.navigate(['/checkout']);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }

  onOfferSubmit() {
    const amount = this.myOfferForm.get('amount')?.value;

    this.productService.offer(this.selectedVariant.id, amount).subscribe((response: any) => {
      console.log('Offer:', response);
      alert('Offer Send Successful!');

      this.myOfferForm.reset();

      const modal = document.getElementById('offerModal');
      if (modal) {
        const modalClosebtn = modal.querySelector('[data-bs-dismiss="modal"]');
        if (modalClosebtn) {
          (modalClosebtn as any).click();
        }
      }
    },
    (error) => {
      console.log(error);
      this.router.navigate(['/login']);
    }
    );
  }

  onRatingSubmit() {
    const review = this.ratingForm.get('reviewInput')?.value;
    const rating = this.ratingForm.get('ratingInput')?.value;
    const orderId = this.selectedVariant?.rating_and_review.find((item: any) => item.rating_availability);

    if (orderId) {
      const orderItemId = orderId.order_item_id;
      console.log('orderItemId', orderItemId);
      console.log('review', typeof(review));
      console.log('rating', typeof(rating));

      this.productService.reviewRating(orderItemId, review, rating).subscribe((response: any) => {
        console.log('Add ratings:', response);
        alert('Add ratings Successful!');

        this.productService.getProductDetail(this.id).subscribe(detail => {
          this.productDetail = detail.data;
          this.selectedVariant = this.productDetail.variants[0];

          this.ratingId = this.productDetail.variants[0].rating_and_review.find((a:any) => a.user_id == this.userId);
        })

        this.ratingForm.reset();

        const modal = document.getElementById('ratingModal');
        if (modal) {
          const modalClosebtn = modal.querySelector('[data-bs-dismiss="modal"]');
          if (modalClosebtn) {
            (modalClosebtn as any).click();
          }
        }
      },
      (error) => {
        alert('User can not add multiple reviews');
        this.ratingForm.reset();

        const modal = document.getElementById('ratingModal');
        if (modal) {
          const modalClosebtn = modal.querySelector('[data-bs-dismiss="modal"]');
          if (modalClosebtn) {
            (modalClosebtn as any).click();
          }
        }

      }
      );
    } else {
      console.error('Order Item ID not available');
      alert('User have to login first!');
      this.ratingForm.reset();

      const modal = document.getElementById('ratingModal');
      if (modal) {
        const modalClosebtn = modal.querySelector('[data-bs-dismiss="modal"]');
        if (modalClosebtn) {
          (modalClosebtn as any).click();
        }
      }
    }
  }

}
