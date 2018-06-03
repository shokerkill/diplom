import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wave Universe';
  name = '';
  userLocation: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // console.log(val);
        this.userLocation = val.urlAfterRedirects ? val.urlAfterRedirects : val.url;
      }
    });
  }
}
