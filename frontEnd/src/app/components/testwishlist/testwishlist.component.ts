import { Component } from '@angular/core';
import {WebService} from "../../web.service";

@Component({
  selector: 'app-testwishlist',
  templateUrl: './testwishlist.component.html',
  styleUrl: './testwishlist.component.css'
})
export class TESTWISHLISTComponent {
  wishlistItems: any[] = []; // Assuming the structure matches the API response

  constructor(private webService: WebService) { }

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
}
