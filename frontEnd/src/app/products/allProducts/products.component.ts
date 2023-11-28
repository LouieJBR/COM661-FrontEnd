import {Component} from "@angular/core";
import {WebService} from "../../web.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent{
  constructor(public webService: WebService ) {}

  ngOnInit(){
    this.product_list = this.webService.getAllProducts(this.page)
  }

  previousPage(){
    if (this.page > 1) {
      this.page = this.page -1;
      this.product_list = this.product_list =
        this.webService.getAllProducts(this.page)
    }
  }

  nextPage(){
      this.page = this.page  +1;
      this.product_list = this.product_list =
        this.webService.getAllProducts(this.page)
  }
  product_list: any = [];
  page: number = 1;
}
