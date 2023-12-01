import {Component} from "@angular/core";
import {WebService} from "../../../web.service";

@Component({
  selector: 'products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent{
  constructor(public webService: WebService ) {}

  products: any = [];


  ngOnInit(){
    if (sessionStorage['page']){
      this.page = Number(sessionStorage['page']);
    }

    this.webService.getAllProductsPagination(this.page).subscribe((data: any) => {
      this.products = data;
      this.createCardGrid(); // Call function to create card grid after data retrieval
    });  }

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
      window.location.href = "/products/" + id;
    });      // Redirect to the URL associated with the product when the card is clicked

    col.appendChild(card);
    return col;
  }

  createCardGrid() {
    let container = document.getElementById('cardContainer');
    this.products.forEach((product: any) => {
      const { name, price, type, size, _id } = product;
      const colElement = this.createCard(name, price, type, size, _id);
      container?.appendChild(colElement);
    });
  }

  previousPage(){
    if (this.page > 1) {
      this.page = this.page -1;
      sessionStorage['page'] = this.page;
      this.products = this.products =
        this.webService.getAllProductsPagination(this.page)
    }
  }

  nextPage(){
    this.page = this.page  +1;
    sessionStorage['page'] = this.page;
    this.products = this.products =
      this.webService.getAllProductsPagination(this.page)

  }
  page: number = 1;
}
