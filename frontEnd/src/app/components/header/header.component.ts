import { Component } from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {WebService} from "../../web.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private webService:WebService) {}

  ngOnInit(){
    return this.isLoggedIn()
  }

  isLoggedIn(){
    return this.authService.isLoggedInUser()
  }

  logOut(){
    return this.webService.logout()
  }

  getUsername() {
    if (this.authService.isLoggedInUser()) {
      return this.authService.getUsername(); // Retrieve and display the username
    }
    return ''; // Return an empty string if not logged in
  }


}
