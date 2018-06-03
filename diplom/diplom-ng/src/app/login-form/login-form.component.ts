import { Component, OnInit } from '@angular/core';
import { AuthenticationService }  from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  showTab: string;
  loginUser: string;
  loginPass: string;
  regUser: string;
  regName: string;
  regSurname: string;
  regPass: string;
  regEmail: string;
  regConfirmPass: string;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.showTab = 'login';
  }

  switchTo(tab: string): void {
    this.showTab = tab;
  }

  loginHandler(): void {
    console.log("LOGIN>>>", this.loginUser, ' ', this.loginPass);
    if (this.loginUser && this.loginPass) {
      this.auth.login(this.loginUser, this.loginPass);
    }
  }

  signupHandler(): void {
    console.log("SIGNUP>>>", this.regUser);
    if (this.regUser && this.regPass && this.regEmail && this.regConfirmPass && this.regPass === this.regConfirmPass) {
      this.auth.register(this.regUser, this.regEmail, this.regPass);
    }
  }

}
