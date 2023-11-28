import {Component} from "@angular/core";
import {WebService} from "../../web.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  product_list: any;
  reviews: any = [];
  constructor(private webService: WebService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    this.product_list = this.webService.getProductById(this.route.snapshot.params['id'])
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id'])
  }
}
