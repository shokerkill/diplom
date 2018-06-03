import { Component, OnInit } from '@angular/core';

import { ArticlesService } from "../services/articles.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticlesService]
})
export class ArticlesComponent implements OnInit {
  articles: any;
  messages: any;

  constructor(
    private articlesService: ArticlesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.http.post('http://127.0.0.1:3000/messages', { user_id: user.user_id })
      .subscribe(data => {
        console.log("messages!>>>", data);
        this.messages = data;
      });

    // this.articlesService.getArticles();
    // this.articles = this.articlesService.articles;
    // this.http.get(`http://127.0.0.1:3000/articles`).subscribe(data => {
    //   // this.articles = adaptData(data);
    // });
  }
}

function adaptData(data) {
  // debugger;
  data = setRotation(data);
  data = moveArticle(data);
  data = filterByViews(data);
  data = dateTransform(data);
  data = oneByOne(data);
  return data;
}

function setRotation(articles) {
  for (var i in articles) {
    let val = Math.random() * 14 - 7;
    articles[i].rotation = 'rotate(' + val + 'deg)'
  }
  return articles
}

function moveArticle(articles) {
  for (var i in articles) {
    let horizontal = Math.random() * 80 - 40,
        vertical = Math.random() * 60 - 30;
    articles[i].horizontal = horizontal + 'px';
    articles[i].vertical = vertical + 'px';
  }
  return articles
}

function dateTransform(articles) {
  for (var i in articles) {
    articles[i].creation_date = articles[i].creation_date.slice(0,10) + ' ' + articles[i].creation_date.slice(11,19);
  }
  return articles
}

function filterByViews(articles) {
  articles.sort(function (prev, next) {
    return next.views - prev.views
  })
  return articles
}

function oneByOne(articles) {
  for (let i=0; i <= articles.length - 1; i++) {
    articles[i].hidden = true;
  }
  for (let i=0; i <= articles.length - 1; i++) {
    setTimeout(function () {
      console.log(i);
      articles[i].hidden = false;
    }, i * 1000)
  }
  return articles;
}
