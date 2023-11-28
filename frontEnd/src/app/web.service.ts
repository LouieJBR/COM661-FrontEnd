import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()
export class WebService {
  constructor(private http: HttpClient) {}
  getAllProducts(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/products?pn=' + page);
    }

  getProductById(id:any) {
    return this.http.get('http://localhost:5000/api/v1.0/products/' + id);
  }

  getReviews(id:any){
    return this.http.get(
      'http://localhost:5000/api/v1.0/products/' +
      id + '/reviews')
  }
  }

