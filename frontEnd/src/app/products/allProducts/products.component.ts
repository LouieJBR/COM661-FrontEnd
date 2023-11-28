import {Component} from "@angular/core";
import {WebService} from "../../web.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent{
  product_list: any = [];

  constructor(public webService: WebService ) {}

  ngOnInit(){
    this.product_list = this.webService.getAllProducts()
  }
}
