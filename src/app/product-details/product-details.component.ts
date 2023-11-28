import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  selectedVariant1: any;

  offerbtn: any;

  myOfferForm!: FormGroup;

  ratingForm!: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    localStorage.removeItem('bookNow');

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.authService.getProductDetail(this.id).subscribe(detail => {
        this.productDetail = detail.data;
        this.stocks = this.productDetail.variants[0];
        this.selectedVariant = this.productDetail.variants[0];
        console.log('this.stocks', this.stocks);
        console.log('this.productDetail', this.productDetail);
        console.log('this.selectedVariant', this.selectedVariant);
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

  goToCartPage(selectedVariantId: any) {
    if (this.addedToCart) {
      this.router.navigate(['/cart', selectedVariantId]);
    } else {
      this.authService.addToCart(selectedVariantId, this.data).subscribe(
        (response) => {
          console.log(response.message);
          alert('Add to cart Successfully');
          this.addedToCart = true;
          setTimeout(() => {
            this.addedToCart = false;
          }, 2000);
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

    this.authService.addToCart(productId, this.data).subscribe(
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
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }

  onOfferSubmit() {
    const amount = this.myOfferForm.get('amount')?.value;

    this.authService.offer(this.selectedVariant.id, amount).subscribe((response: any) => {
      console.log('Offer:', response);
      alert('Offer Send Successful!')
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

      this.authService.reviewRating(orderItemId, review, rating).subscribe((response: any) => {
        console.log('Add ratings:', response);
        alert('Add ratings Successful!');
      },
      (error) => {
        alert('User can not add multiple reviews');

      }
      );
    } else {
      console.error('Order Item ID not available');
      alert('User have to login first!');
    }
  }

  get loggedIn(): any {
    const accessToken = sessionStorage.getItem('access_token');
    return !!accessToken;
  }


}
