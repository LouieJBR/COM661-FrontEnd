import {Component} from "@angular/core";
import {WebService} from "../../web.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  product_list: any;
  reviews: any = [];
  reviewForm: any;
  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.reviewForm = this.formBuilder.group({
      username: '',
      comment: '',
      stars: 5
    })

    this.product_list = this.webService.getProductById(this.route.snapshot.params['id'])
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id'])
  }

  onSubmit(){
    console.log(this.reviewForm.value)
  }
}
