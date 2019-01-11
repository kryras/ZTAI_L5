import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // show: boolean;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    // this.show = this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      // this.show = this.authService.isLoggedIn();
    });
  }


}
