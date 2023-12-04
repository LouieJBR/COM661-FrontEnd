import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebService} from "../../web.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private webService: WebService) { }

  onSubmit(): void {
    // Prepare data for login API call
    const loginData = {
      username: this.username,
      password: this.password
    };

    // Make API call to login endpoint
    this.webService.login(loginData)
      .subscribe(
        (response) => {
          console.log('Signed In', response);
          // Handle successful login here, maybe route to a new page or store login status
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login failure, show error message to the user, etc.
        }
      );
  }
}
