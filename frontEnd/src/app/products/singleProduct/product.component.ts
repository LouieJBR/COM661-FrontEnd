import {Component} from "@angular/core";
import {WebService} from "../../web.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
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
      username: ['', Validators.required],
      comment: ['', Validators.required],
      stars: 5
    })

    this.product_list = this.webService.getProductById(this.route.snapshot.params['id'])
    this.reviews = this.webService.getReviews(this.route.snapshot.params['id'])
  }

  onSubmit(){
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
      this.reviews = this.webService.getReviews(
        this.route.snapshot.params['id']);
    });
  }

  isInvalidUsername() {
    const usernameChecks =  this.reviewForm.controls.username.invalid &&
      this.reviewForm.controls.username.touched;

    return usernameChecks
  }

  isInvalidComment() {
    const commentChecks=  this.reviewForm.controls.comment.invalid &&
      this.reviewForm.controls.comment.touched;

    return commentChecks
  }

  isUntouched() {
    return this.reviewForm.controls.username.pristine ||
      this.reviewForm.controls.comment.pristine;
  }
  isIncomplete() {
    return this.isInvalidUsername() || this.isInvalidComment() ||
    this.isUntouched();
  }
}
