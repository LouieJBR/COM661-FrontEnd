import { Component } from '@angular/core';
import {WebService} from "../../web.service";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  account = {
    username: '',
    name: '',
    email: '',
    new_name: '',
    new_username: '',
    new_email: ''
  };

  errorMessage: string = '';

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.getUserDetails(); // Call getUserDetails when the component initializes
  }

  getUserDetails() {
    this.webService.getUserDetails().subscribe(
      (userData: any) => {
        this.account = {
          username: userData.user.username,
          name: userData.user.name,
          email: userData.user.email,
          new_name: '',
          new_username: '',
          new_email: ''
        };
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
        // Handle error fetching user details
      }
    );
  }

  updateAccount() {
    const data = {
      username: this.account.username,
      new_name: this.account.new_name,
      new_username: this.account.new_username,
      new_email: this.account.new_email
      // Include other fields as needed for updating
    };

    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Assuming content type is JSON
        // Add other headers as needed
      })
    };

    this.webService.updateAccount(data, headers).subscribe(
      () => {
        console.log('Account updated successfully');
        // Additional logic if needed upon successful update
        window.location.href = "/account";
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.errorMessage = error.error.message; // Display the error message from the API response
      }
    );
  }
}
