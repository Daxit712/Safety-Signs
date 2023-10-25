import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  // details: any = [
  //   {
  //     id: 0,
  //     text: 'helo1',
  //     text1: 'helo1',
  //     text2: 'helo1',
  //     text3: 'helo1',
  //   },
  //   {
  //     id: 1,
  //     text: 'helo2',
  //     text1: 'helo2',
  //     text2: 'helo2',
  //     text3: 'helo2',
  //   }
  // ];

  // id: any;
  // selectedDetail: any;

  // constructor(private route: ActivatedRoute){
  // }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.id = params['productId'];
  //     this.findProductDetail();
  //   });
  // }

  // findProductDetail() {
  //   this.selectedDetail = this.details.find((item: any) => item.id == this.id);
  //   if (this.selectedDetail.length === 0) {
  //     this.selectedDetail = { text: 'Product not found' };
  //   }
  // }

  data: number = 0;

  increment() {
    this.data = this.data + 1;
  }
  decrement() {
    if (this.data === 0) {
      return;
    }
    this.data = this.data - 1;
  }

  slides = [
    {img: "assets/images/img1.jpg"},
    {img: "assets/images/img2.png"},
    {img: "assets/images/watch.png"},
    {img: "assets/images/img1.jpg"},
    {img: "assets/images/img2.png"},
    {img: "assets/images/watch.png"},
  ];

  modalslides = [
    {img: "assets/images/img1.jpg"},
    {img: "assets/images/img2.png"},
    {img: "assets/images/watch.png"},
    {img: "assets/images/img1.jpg"},
    {img: "assets/images/img2.png"},
    {img: "assets/images/watch.png"},
  ];
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

}
