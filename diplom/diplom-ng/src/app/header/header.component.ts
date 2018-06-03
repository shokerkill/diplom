import { Component, OnInit } from '@angular/core';
import { AuthenticationService }  from '../services/authentication.service';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLocation: string;
  user: any;

  constructor(private auth: AuthenticationService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // console.log(val);
        this.userLocation = val.urlAfterRedirects ? val.urlAfterRedirects : val.url;
      }
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  }

  logoutHandler(): void {
    this.auth.logout();
  }

}
