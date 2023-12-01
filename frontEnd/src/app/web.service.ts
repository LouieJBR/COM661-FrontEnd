import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()
export class WebService {
  constructor(private http: HttpClient) {}

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

