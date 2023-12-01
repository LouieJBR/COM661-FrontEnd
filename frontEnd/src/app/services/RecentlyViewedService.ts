import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
  private readonly STORAGE_KEY = 'recentlyViewed';

  addToRecentlyViewed(product: any) {
    let recentlyViewed: any[] = JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) || '[]');

    // Check if the product is already in the recently viewed list and remove it if present
    recentlyViewed = recentlyViewed.filter((item: any) => item.id !== product.id);

    // Add the product to the beginning of the list
    recentlyViewed.unshift(product);

    // Keep only the latest 5 viewed products
    recentlyViewed = recentlyViewed.slice(0, 5);

    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentlyViewed));
  }

  getRecentlyViewed(): any[] {
    return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}
