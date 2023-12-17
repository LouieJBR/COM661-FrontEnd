import {Component} from '@angular/core';
import {WebService} from "../../web.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlistItems: any[] = []; // Assuming the structure matches the API response

  constructor(private webService: WebService, private router: Router) {
  }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.webService.getAllFromWishlist().subscribe(
      (data: any) => {
        this.wishlistItems = data.wishlist;
      },
      (error: any) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

  redirectToProduct(productId: string) {
    this.router.navigate(['/products', productId]);
  }

}
