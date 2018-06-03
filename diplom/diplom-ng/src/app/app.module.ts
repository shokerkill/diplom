import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard }  from './services/auth-guard.service';
import {AuthenticationService} from "./services/authentication.service";


const appRoutes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'tests',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'test/:id',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login',
    component: LoginFormComponent,

  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    HomeComponent,
    ArticleComponent,
    LoginFormComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function isLogged () {
  return false;
}
