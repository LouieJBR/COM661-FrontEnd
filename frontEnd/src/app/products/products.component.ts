import {Component} from "@angular/core";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent{
  business_list = [
    { "name": "Pizza Place",
      "city": "Coleraine",
      "review_count": 10 },
    { "name": "Wine Lake",
      "city": "Ballymoney",
      "review_count": 7 },
    { "name": "Beer Tavern",
      "city": "Ballymena",
      "review_count": 12 }
  ];
}
