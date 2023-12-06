import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {WebService} from "../../web.service";
import {Router} from "@angular/router";
import {catchError, filter, tap, throwError} from "rxjs";
import {AuthService} from "../../services/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private webService: WebService, private authService: AuthService) {}


  onLogin() {
    const auth = btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json' // Assuming the content type is JSON
    });


    const options = {headers};

    const data = {username: this.username, password: this.password};

    if (this.webService.login(data, options).subscribe()){
      const user =  this.username
      this.authService.setLoggedIn(user)
    }
  }
}
