import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  userId: any;
  tests: any;
  onCreatePost: boolean = false;
  onWriteMessage: boolean = false;
  postText: string;
  messageText: string;
  isGuest: boolean;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, private http: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isGuest = false;
    this.http.get('http://127.0.0.1:8000/all-tests/' + this.user.user_id)
      .subscribe(data => {
        if (data) {
          console.log("tests>>", data);
          this.tests = data;
        }
      });
  };

  openTextBlock(option: string) {
    if (option === 'post') {
      this.onWriteMessage = false;
      this.onCreatePost = !this.onCreatePost;
    } else {
      this.onCreatePost = false;
      this.onWriteMessage = !this.onWriteMessage;
    }
  }

  createPost() {
    this.onCreatePost = false;
    console.log(this.postText);
    this.auth.createPost(+this.userId, this.postText);
    this.postText = '';
  }

  sendMessage() {
    this.onWriteMessage = false;
    console.log(this.messageText);
    let user = JSON.parse(localStorage.getItem('user'));
    this.auth.sendMessage(user.user_id, +this.userId, this.messageText);
    this.messageText = '';
  }

}
