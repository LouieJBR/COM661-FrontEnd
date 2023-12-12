import { Component } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/AuthService";
import {WebService} from "../../web.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private webService: WebService, private router: Router) {
  }

  onSignup() {
    const data = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Assuming the content type is JSON
    });
    const options = {headers};

    this.webService.signUp(data, options).subscribe(
      () => {
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.errorMessage = error; // Display the error message from the API response
      }
    );
  }
}
