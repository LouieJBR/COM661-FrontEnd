import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';
import {catchError, filter, map, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class WebService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  private getHeaders() {
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders({
      'x-access-token': token,
    });
    return { headers };
  }

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

  // login(data: any, options: any) {
  //
  //   return this.http.post<any>('http://localhost:5000/api/v1.0/login', data, options)
  //     .pipe(
  //       filter((event: any) => event instanceof HttpResponse), // Filter only HttpResponse events
  //       tap((response: HttpResponse<any>) => {
  //         console.log(response.headers)
  //         console.log(response)
  //         const token = response.body.get('token');
  //         console.log(token);
  //
  //         // Redirect to '/' upon successful login
  //         this.router.navigate(['/']);
  //       })
  //     );
  // }

  login(data: any, options: any) {
    return this.http.post<any>('http://localhost:5000/api/v1.0/login', data, options).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      }),
      tap((response: any) => {
        console.log('Response received:', response); // Log the full response for debugging
        if (response && response.token) {
          console.log('Token:', response.token); // Log the token if available
          // Assuming you have a function to save the token
          // Save the token here
          this.router.navigate(['/']); // Manually navigate to the home page
        } else {
          console.log('Invalid response');
        }
      })
    );
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

