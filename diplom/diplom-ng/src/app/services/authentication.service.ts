import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post('http://127.0.0.1:8000/api-token-auth2/', { username: username, password: password })
      .subscribe(data => {
        console.log("USER>>>", data);
        localStorage.setItem('user', JSON.stringify(data));
        let path = "/tests";
        this.router.navigate([path]);
      // this.articles = adaptData(data);
      });
      // .map(user => {
      //   console.log("User>>>", user);
      //   // login successful if there's a jwt token in the response
      //   if (user && user.token) {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('user', JSON.stringify(user));
      //   }
      //
      //   return user;
      // });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }

  register(username: string, email: string, password: string) {
    this.http.post('http://127.0.0.1:8000/users/register', { username: username, email: email, password: password })
      .subscribe(data => {
        console.log("USER>>>", data);
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(["/tests"]);
        // this.articles = adaptData(data);
      });
  }

  // getUser(userId: any) {
  //   this.http.post('http://127.0.0.1:3000/get-user', { user_id: userId})
  //     .subscribe(data => {
  //       console.log("USER>>>", data);
  //       return data;
  //       // this.articles = adaptData(data);
  //     });
  // }

  createPost(userId: number, text: string) {
    let user = JSON.parse(localStorage.getItem('user')),
        authorId = +user.user_id,
        authorName = user.name + ' ' + user.surname;
    this.http.post('http://127.0.0.1:3000/create-post', { user_id: userId, author_id: authorId, author_name: authorName, text: text })
      .subscribe(data => {
        console.log("POST>>>", data);
      });
  }

  like(postId: number) {
    this.http.post('http://127.0.0.1:3000/like', { post_id: postId })
      .subscribe(data => {
        console.log("Liked!>>>", data);
      });
  }

  comment(postId: number) {
    this.http.post('http://127.0.0.1:3000/comment', { post_id: postId })
      .subscribe(data => {
        console.log("Commented!>>>", data);
      });
  }

  sendMessage(userId: number, friendId: number, text: string) {
    this.http.post('http://127.0.0.1:3000/send-message', { user_id: userId, friend_id: friendId, text: text })
      .subscribe(data => {
        console.log("message sent!>>>", data);
      });
  }
}
