import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  psortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';
  nsortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';
  asortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';

  upArrow = false;
  downArrow = true;

  nameUpArrow = false;
  nameDownArrow = true;

  dateUpArrow = false;
  dateDownArrow = true;

  productList: any[] = [];

  original: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(
      (data: any) => {
        this.productList = data.data;
        this.original = [...this.productList];
        console.log('productList', this.productList);
      },
      (error) => {
        console.error('Failed to retrieve user data:', error);
      }
    );
  }

  originalpro() {
    this.productList = [...this.original]
  }
  price() {
    if (this.psortingOrder === 'highToLow') {
      this.productList.sort((a, b) =>
        parseFloat(a.sell_price) - parseFloat(b.sell_price)
      );
      this.psortingOrder = 'lowToHigh';
      this.downArrow = false;
      this.upArrow = true;
    } else {
      this.productList.sort((a, b) =>
        parseFloat(b.sell_price) - parseFloat(a.sell_price)
      );
      this.psortingOrder = 'highToLow';
      this.downArrow = true;
      this.upArrow = false;
    }
  }
  name() {
    if (this.nsortingOrder === 'highToLow') {
      this.productList.sort((a, b) => a.product_name.localeCompare(b.product_name));
      this.nsortingOrder = 'lowToHigh';
      this.nameDownArrow = false;
      this.nameUpArrow = true;
    } else {
      this.productList.sort((a, b) => b.product_name.localeCompare(a.product_name));
      this.nsortingOrder = 'highToLow';
      this.nameDownArrow = true;
      this.nameUpArrow = false;
    }
  }
  date() {
    if (this.asortingOrder === 'highToLow') {
      this.productList.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateA.getTime() - dateB.getTime();
      });
      this.asortingOrder = 'lowToHigh';
      this.dateDownArrow = false;
      this.dateUpArrow = true;
    } else {
      this.productList.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return dateB.getTime() - dateA.getTime();
      });
      this.asortingOrder = 'highToLow';
      this.dateDownArrow = true;
      this.dateUpArrow = false;
    }
  }

  goToProductDetails(productId: any) {
    console.log("gotoproductdetails")
    this.router.navigate(['product/details', productId]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
