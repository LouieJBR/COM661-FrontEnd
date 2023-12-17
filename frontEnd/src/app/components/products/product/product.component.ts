import {Component} from "@angular/core";
import {WebService} from "../../../web.service";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/AuthService";
import {style} from "@angular/animations";

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent {
  product_list: any;
  reviews: any = [];
  reviewForm: any;
  wishlistItems: any[] = []; // Assuming the structure matches the API response

  activeProductId: any;
  constructor(private webService: WebService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService) {}

  ngOnInit(){

    this.setUpReviewForm();
    this.activeProductId = this.route.snapshot.params['id'];
    this.product_list = this.webService.getProductById(this.activeProductId);
    this.reviews = this.webService.getReviews(this.activeProductId);

    // Fetch wishlist items once during initialization
    this.fetchWishlistItems();
  }

  setUpReviewForm(){
    if(this.isLoggedIn()){
      this.reviewForm = this.formBuilder.group({
        username: [this.getUsername(), Validators.required],
        comment: ['', Validators.required],
        stars: 5
      })
    }else{
      this.reviewForm = this.formBuilder.group({
        username: ['', Validators.required],
        comment: ['', Validators.required],
        stars: 5
      })
    }
  }
  onSubmit(){
    this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
      this.reviewForm.reset();
      this.reviews = this.webService.getReviews(
        this.route.snapshot.params['id']);
      this.setUpReviewForm()
    });
  }


  isInvalidUsername() {
    if(this.isLoggedIn()){
      return false
    }else{
        return this.reviewForm.controls.username.invalid &&
        this.reviewForm.controls.username.touched;
    }
  }

  isInvalidComment() {
    const commentChecks=  this.reviewForm.controls.comment.invalid &&
      this.reviewForm.controls.comment.touched;

    return commentChecks
  }

  isUntouched() {
    if(this.isLoggedIn()){
        return this.reviewForm.controls.comment.pristine;
    }else{
      return this.reviewForm.controls.username.pristine ||
        this.reviewForm.controls.comment.pristine;
    }
  }
  isIncomplete() {
    return this.isInvalidUsername() || this.isInvalidComment() ||
    this.isUntouched();
  }

  isLoggedIn() {
    return this.authService.isLoggedInUser();
  }

  getUsername() {
    return this.authService.getUsername();
  }

  addToWishlist() {
    return this.webService.addToWishlist(this.activeProductId)
  }

  removeFromWishlist(){
    return this.webService.removeFromWishlist(this.activeProductId)
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some(item => item._id === productId);
  }

  fetchWishlistItems() {
    this.webService.getAllFromWishlist().subscribe(
      (data: any) => {
        this.wishlistItems = data.wishlist;
      },
      (error: any) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

}
