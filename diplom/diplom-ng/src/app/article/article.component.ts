import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: any;
  testId: any;
  questions: any = [];
  answers: any = [];
  user:any;
  sub:any;
  question:any;
  results: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.testId = params['id'];
      this.question = 0;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.http.get('http://127.0.0.1:8000/questions/' + this.testId + '/')
        .subscribe(data => {
          if (data) {
            console.log("questions>>", data);
            this.questions = data;
            for (let i in this.questions) {
              this.answers[i] = {question_id: this.questions[i].id};
            }
          }
        });
    });
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  nextQuestion(): void {
    if (this.answers[this.question].answer) {
      this.question += 1;
      if (this.question > this.questions.length - 1) {
        console.log("DONE!!!");
        console.log(this.answers);
        this.http.post('http://127.0.0.1:8000/batch_answers/', {user_id: this.user.user_id, test_id: this.testId, answers: this.answers})
        .subscribe(data => {
          if (data) {
            console.log("answers>>", data);
            this.results = data;
          }
        });
      }
    } else {
      console.log('NO ANSWER!');
    }
  }

  anotherTests(): void {
    this.router.navigate(["/tests"]);
  }

}
