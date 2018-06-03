import {Injectable} from "@angular/core";
// import { HttpClientModule } from "@angular/common/http";
// import { Http, Response } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ArticlesService {
  articles: any;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.getArticles();
  }

  getDefault() {
    this.articles = [
      {
        id: 1,
        title: 'Test Article 1',
        author: 'Vyzor',
        subject: 'Test',
        text: 'Hi! Some test text Some test text Some test text Some test text Some test text Some test text Some test text Some test text'
      },
      {
        id: 2,
        title: 'Test Article 2',
        author: 'Vyzor',
        subject: 'Test',
        text: 'Some test text Some test text Some test text Some test text Some test text Some test text Some test text Some test text'
      },
      {
        id: 3,
        title: 'Test Article 3',
        author: 'Vyzor',
        subject: 'Test',
        text: 'Some test text Some test text Some test text Some test text Some test text Some test text Some test text Some test text'
      },
      {
        id: 4,
        title: 'Test Article 4',
        author: 'Vyzor',
        subject: 'Test',
        text: 'Some test text Some test text Some test text Some test text Some test text Some test text Some test text Some test text'
      },
      {
        id: 5,
        title: 'Test Article 5',
        author: 'Vyzor',
        subject: 'Test',
        text: 'Some test text Some test text Some test text Some test text Some test text Some test text Some test text Some test text'
      },
    ];
  }


  getArticles() {
    this.http.get(`http://127.0.0.1:3000/articles`).subscribe(data => {
      // Read the result field from the JSON response.
      this.articles = data;
    });
  }

  addArticle(title: string, author: string, subject: string, text: string) {

  }

  deleteArticle(id: number) {

  }
}
