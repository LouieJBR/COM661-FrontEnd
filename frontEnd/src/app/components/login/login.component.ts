// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { WebService } from '../../web.service';
//
// @Component({
//   selector: 'login',
//   templateUrl: 'login.component.html',
//   styleUrl: 'login.component.css'
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//
//   constructor(private webService: WebService) {
//   }
//
//   onSubmit(): void {
//     const loginData = {
//       username: this.username,
//       password: this.password
//     };
//
//     this.webService.login(loginData);
//   }
// }

import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebService} from "../../web.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private webService: WebService) {}

  onLogin() {
    const auth = btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json' // Assuming the content type is JSON
    });

    const options = { headers };

    const data = { username: this.username, password: this.password };


    this.webService.login(data, options)
  }
}
