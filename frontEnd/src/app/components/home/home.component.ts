import {Component, OnInit} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {WebService} from "../../web.service";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   constructor(public authService: AuthService, public webService: WebService) {}
//
//   products: any = [];
//
//   ngOnInit() {
//     this.webService.getAllProducts(1).subscribe((data: any) => {
//       this.products = data;
//       this.createCardGrid(); // Call function to create card grid after data retrieval
//     });
//   }
//
//   createCard(name: string, price: string, type: string, size: string) {
//     const card = document.createElement('div');
//     card.classList.add('card', 'm-3');
//     card.innerHTML = `
//       <div class="card-body">
//         <h5 class="card-title">${name}</h5>
//         <p class="card-text">Price: ${price}</p>
//         <p class="card-text">Type: ${type}</p>
//         <p class="card-text">Size: ${size}</p>
//       </div>
//     `;
//     return card;
//   }
//
//   createCardGrid() {
//     const container = document.getElementById('cardContainer');
//     this.products.forEach((product: any) => {
//       const { name, price, type, size } = product;
//       const cardElement = this.createCard(name, price, type, size);
//       container?.appendChild(cardElement);
//     });
//   }
// }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public webService: WebService) {}

  products: any = [];

  ngOnInit() {
    this.webService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      this.createCardGrid(); // Call function to create card grid after data retrieval
    });
  }

  createCard(name: string, price: string, type: string, size: string, id:string) {
    const col = document.createElement('div');
    col.classList.add('col-md-4'); // Adjust column size based on your design (e.g., col-md-4, col-lg-3)
    const card = document.createElement('div');
    card.classList.add('card', 'm-3');
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Price: ${price}</p>
        <p class="card-text">Type: ${type}</p>
        <p class="card-text">Size: ${size}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      // Redirect to the URL associated with the product when the card is clicked
      window.location.href = "/products/" + id;
    });
    col.appendChild(card);
    return col;
  }

  createCardGrid() {
    const container = document.getElementById('cardContainer');
    this.products.forEach((product: any) => {
      const { name, price, type, size, _id } = product;
      const colElement = this.createCard(name, price, type, size, _id);
      container?.appendChild(colElement);
    });
  }
}

