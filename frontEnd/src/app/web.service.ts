import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import {catchError, filter, map, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./services/AuthService";

@Injectable()
export class WebService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private authService: AuthService) {}

  private productID: any;
  getAllProductsPagination(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/products?pn=' + page);
    }

  getAllProducts() {
    return this.http.get('http://localhost:5000/api/v1.0/products');
  }
  getProductById(id:any) {
    this.productID = id
    return this.http.get('http://localhost:5000/api/v1.0/products/' + id);
  }

  getProductByType(productType:any) {
    console.log(productType)
    return this.http.get('http://localhost:5000/api/v1.0/products/type/'+ productType);
  }

  getReviews(id:any){
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

  logout(){
    this.authService.logout()
    return this.http.get('http://localhost:5000/api/v1.0/logout');
  }


  postReview(review: any){
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
  }

