import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()
export class WebService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get('http://localhost:5000/api/v1.0/products');
    }
  }

