import {Component} from '@angular/core';
import {WebService} from "../../../web.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-productByType',
  templateUrl: './productByType.component.html',
  styleUrl: './productByType.component.css'
})
export class ProductByTypeComponent {
  constructor(public webService: WebService,
              private route: ActivatedRoute,
  ) {
  }

  products: any = [];
  page: number = 1;

  filterProductType = this.route.snapshot.params['productType']

  convertToTitleCase(sentence: string): string {
    return sentence.toLowerCase().split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  ngOnInit() {
    this.fetchProducts();
    console.log(this.products)
  }

  typeToSearch = this.convertToTitleCase(this.filterProductType);

  fetchProducts() {
    this.webService.getProductByType(this.filterProductType).subscribe((data: any) => {
      this.products = data;
      this.createCardGrid(); // Call function to create card grid after data retrieval
    });
  }

  createCard(name: string, price: string, type: string, size: string, id: string) {
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
      window.location.href = "/products/" + id;
    });      // Redirect to the URL associated with the product when the card is clicked

    col.appendChild(card);
    return col;
  }

  createCardGrid() {
    const container = document.getElementById('cardContainer');
    container!.innerHTML = ''; // Clear previous cards before adding new ones
    this.products.forEach((product: any) => {
      const {name, price, type, size, _id} = product;
      const colElement = this.createCard(name, price, type, size, _id);
      container?.appendChild(colElement);
    });
  }


  previousPage() {
    if (this.page > 1) {
      this.page--;
      sessionStorage['page'] = this.page;
      this.fetchProducts();
    }
  }

  nextPage() {
    this.page++;
    sessionStorage['page'] = this.page;
    this.fetchProducts();
  }
}
