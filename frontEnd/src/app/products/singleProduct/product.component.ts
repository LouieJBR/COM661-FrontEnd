import {Component} from "@angular/core";
import {WebService} from "../../web.service";

@Component({
  selector: 'products',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  product_list: any = [];

  constructor(public webService: WebService ) {}

  ngOnInit(){
    this.product_list = this.webService.getAllProducts()
  }
}
