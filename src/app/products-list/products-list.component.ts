import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  watchData : any[] =[
    {
      img : "assets/images/watch.png",
      title : "VAN HEUSEN",
      details: "Analog Watch - For Women",
      price : "₹1000",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2023-10-06T14:32:29+05:30'
    },
    {
      img : "assets/images/watch.png",
      title : "LOIS CARON",
      details: "Analog Watch - For Women",
      price : "₹1000",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2023-10-08T14:32:29+05:30'
    },
    {
      img : "assets/images/watch.png",
      title : "SONATA",
      details: "Analog Watch - For Women",
      price : "₹2000",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2022-10-06T14:32:29+05:30'
    },
    {
      img : "assets/images/watch.png",
      title : "PETER ENGLAND",
      details: "Analog Watch - For Women",
      price : "₹2200",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2023-08-06T14:32:29+05:30'
    },
    {
      img : "assets/images/watch.png",
      title : "SONATA",
      details: "Analog Watch - For Women",
      price : "₹9000",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2023-10-23T14:32:29+05:30'
    },
    {
      img : "assets/images/watch.png",
      title : "PETER ENGLAND",
      details: "Analog Watch - For Women",
      price : "₹2050",
      originalprice: "₹2999",
      discount: "50% off",
      date: '2021-10-06T14:32:29+05:30'
    }
  ]

  constructor(private router: Router) { }

  original: any[] = [...this.watchData];

  // sorting: string = 'sort';

  // sortProducts() {
  //   if (this.sorting === 'low') {
  //     this.watchData.sort((a, b) => parseFloat(b.price.substr(1)) - parseFloat(a.price.substr(1)));
  //   } else if (this.sorting === 'high') {
  //     this.watchData.sort((a, b) => parseFloat(a.price.substr(1)) - parseFloat(b.price.substr(1)));
  //   } else if (this.sorting === 'name') {
  //     this.watchData.sort((a, b) => a.title.localeCompare(b.title));
  //   } else if (this.sorting === 'date') {
  //     this.watchData.sort((a, b) => {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);

  //       return dateA.getTime() - dateB.getTime();
  //     });
  //   } else if (this.sorting === 'sort') {
  //     this.watchData = [...this.original]
  //   }
  // }

  psortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';
  nsortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';
  asortingOrder: 'lowToHigh' | 'highToLow' = 'lowToHigh';

  upArrow = false;
  downArrow = true;

  nameUpArrow = false;
  nameDownArrow = true;

  dateUpArrow = false;
  dateDownArrow = true;


  originalpro() {
    this.watchData = [...this.original]
  }
  price() {
    if (this.psortingOrder === 'highToLow') {
      this.watchData.sort((a, b) =>
        parseFloat(a.price.substr(1)) - parseFloat(b.price.substr(1))
      );
      this.psortingOrder = 'lowToHigh';
      this.downArrow = false;
      this.upArrow = true;
    } else {
      this.watchData.sort((a, b) =>
        parseFloat(b.price.substr(1)) - parseFloat(a.price.substr(1))
      );
      this.psortingOrder = 'highToLow';
      this.downArrow = true;
      this.upArrow = false;
    }
  }
  name() {
    if (this.nsortingOrder === 'highToLow') {
      this.watchData.sort((a, b) => a.title.localeCompare(b.title));
      this.nsortingOrder = 'lowToHigh';
      this.nameDownArrow = false;
      this.nameUpArrow = true;
    } else {
      this.watchData.sort((a, b) => b.title.localeCompare(a.title));
      this.nsortingOrder = 'highToLow';
      this.nameDownArrow = true;
      this.nameUpArrow = false;
    }
  }
  date() {
    if (this.asortingOrder === 'highToLow') {
      this.watchData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
      });
      this.asortingOrder = 'lowToHigh';
      this.dateDownArrow = false;
      this.dateUpArrow = true;
    } else {
      this.watchData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        console.log(dateA.getTime());


        return dateB.getTime() - dateA.getTime();
      });
      this.asortingOrder = 'highToLow';
      this.dateDownArrow = true;
      this.dateUpArrow = false;
    }
  }


  // mobilesData : any[] =[
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "1M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.1000"
  //   },
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "2M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.2000"
  //   },
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "3M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.3000"
  //   },
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "4M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.4000"
  //   },
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "5M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.5000"
  //   },
  //   {
  //     mobilesImg : "assets/mobile1.jpg",
  //     mobilesTitle : "M6™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     mobilesPrice : "From Rs.6000"
  //   }
  // ]


  // laptopsData : any[] =[
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "1M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     laptopsPrice : "From Rs.1000"
  //   },
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "2M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     laptopsPrice : "From Rs.2000"
  //   },
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "3M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     laptopsPrice : "From Rs.3000"
  //   },
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "4M™ Health Care Particulate Respirator and Surgical Mask 1860, N95",
  //     laptopsPrice : "From Rs.4000"
  //   },
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "5M™ Health Care Particulate Respirator and Surgical laptop 1860, N95",
  //     laptopsPrice : "From Rs.5000"
  //   },
  //   {
  //     laptopsImg : "assets/laptop.jpg",
  //     laptopsTitle : "6M™ Health Care Particulate Respirator and Surgical laptop 1860, N95",
  //     laptopsPrice : "From Rs.6000"
  //   }
  // ]

  goToProductDetails(productId: number) {
    console.log("gotoproductdetails")
    this.router.navigate(['/detail', productId]);
  }

}
