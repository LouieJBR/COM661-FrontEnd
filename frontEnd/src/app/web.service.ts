import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import {catchError, filter, map, Observable, tap, throwError} from "rxjs";
import {Router, withInMemoryScrolling} from "@angular/router";
import {AuthService} from "./services/AuthService";

@Injectable()
export class WebService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private authService: AuthService) {
  }

  private readonly ACTIVE_USER_KEY = 'ActiveUser';

  private productID: any;

  getAllProductsPagination(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/products?pn=' + page);
  }

  getAllProducts() {
    return this.http.get('http://localhost:5000/api/v1.0/products');
  }

  getProductById(id: any) {
    this.productID = id
    return this.http.get('http://localhost:5000/api/v1.0/products/' + id);
  }

  getProductByType(productType: any) {
    console.log(productType)
    return this.http.get('http://localhost:5000/api/v1.0/products/type/' + productType);
  }

  getReviews(id: any) {
    return this.http.get(
      'http://localhost:5000/api/v1.0/products/' +
      id + '/reviews')
  }

  login(data: any, options: any) {
    return this.http.post<any>('http://localhost:5000/api/v1.0/login', data, options).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        let errorMessage = 'Login failed. Please check your credentials.'; // Default error message
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response if available
        }
        return throwError(errorMessage); // Pass the error message down the observable chain
      }),
      tap((response: any) => {
        console.log('Response received:', response); // Log the full response for debugging
        if (response && response.token) {
          console.log('Token:', response.token); // Log the token if available
          this.authService.setAuthToken(response.token)
          // Assuming you have a function to save the token
          // Save the token here
          this.router.navigate(['/']); // Manually navigate to the home page
        } else {
          console.log('Invalid response');

        }
      })
    );
  }

  signUp(data: any, options: any) {
    return this.http.post<any>('http://localhost:5000/api/v1.0/signup', data, options).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        let errorMessage = 'Signup failed. Please try again.'; // Default error message
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response if available
        }
        return throwError(errorMessage); // Pass the error message down the observable chain
      }),
      tap((response: any) => {
        console.log('Signup response received:', response); // Log the full response for debugging
        // Handle the response as needed upon successful signup
        // For instance, you might want to redirect to another page after successful signup
        // Modify this section based on your application's logic
        if (response) {
          console.log('Signup successful');
          // For example, navigate to the home page
          this.router.navigate(['/login']); // Navigate to the home page after signup
        } else {
          console.log('Invalid signup response');
          // Handle invalid signup response here
        }
      })
    );
  }

  updateAccount(data: any, options: any) {
    return this.http.put<any>('http://localhost:5000/api/v1.0/update-account', data, options).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        let errorMessage = 'Account update failed. Please try again.'; // Default error message
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response if available
        }
        return throwError(errorMessage); // Pass the error message down the observable chain
      }),
      tap((response: any) => {
        console.log('Update account response received:', response); // Log the full response for debugging
        if (response) {
          console.log('Account update successful');
          window.location.href="/account"
        } else {
          console.log('Invalid account update response');
          // Handle invalid account update response here
        }
      })
    );
  }

  getUserDetails() {
    let username = sessionStorage.getItem(this.ACTIVE_USER_KEY)
    return this.http.get('http://localhost:5000/api/v1.0/user-details/' + username!.toString());
  }


  logout() {
    this.authService.logout()
    return this.http.get('http://localhost:5000/api/v1.0/logout');
  }


  postReview(review: any) {
    let postData = new FormData();
    postData.append("username", review.username);
    postData.append("comment", review.comment);
    postData.append("stars", review.stars);
    // Todo: Add date posted field to reviews
    // let today = new Date();
    // let todayDate = today.getFullYear() + "-" +
    //   today.getMonth() + "-" +
    //   today.getDate();
    // postData.append("date", todayDate);

    return this.http.post('http://localhost:5000/api/v1.0/products/' +
      this.productID + '/reviews', postData);
  }

  getUserId() {
    let userName = sessionStorage.getItem(this.ACTIVE_USER_KEY)
    return this.http.get('http://localhost:5000/api/v1.0/users/' + userName)
  }

  addToWishlist(productId: string) {
    const username = sessionStorage.getItem(this.ACTIVE_USER_KEY); // Retrieve username from session storage

    if (username) {
      this.http.post(`http://localhost:5000/api/v1.0/wishlist/${username}/add/${productId}`, {}).subscribe(
        (response: any) => {
          // Handle successful addition to wishlist response here
          console.log('Product added to wishlist:', response);
          window.location.href='/wishlist'
        },
        (error: any) => {
          // Handle error response here
          console.error('Failed to add product to wishlist:', error);
        }
      );
    } else {
      // Handle scenario where username is not available
      console.error('Username not found');
    }
  }

  removeFromWishlist(productId: string) {
    const username = sessionStorage.getItem(this.ACTIVE_USER_KEY); // Retrieve username from session storage

    if (username) {
      this.http.delete(`http://localhost:5000/api/v1.0/wishlist/${username}/remove/${productId}`, {}).subscribe(
        (response: any) => {
          // Handle successful addition to wishlist response here
          console.log('Product removed from wishlist:', response);
          window.location.href='/wishlist'
        },
        (error: any) => {
          // Handle error response here
          console.error('Failed to remove product from wishlist:', error);
        }
      );
    } else {
      // Handle scenario where username is not available
      console.error('Username not found');
    }
  }

  getAllFromWishlist(){
    let username = sessionStorage.getItem(this.ACTIVE_USER_KEY)
    return this.http.get('http://localhost:5000/api/v1.0/wishlist/' + username)
  }
}
