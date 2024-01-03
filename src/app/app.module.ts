import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {HttpClientModule} from "@angular/common/http";
import { PostOneComponent } from './post-one/post-one.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostOneComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide : "urlAPI", useValue : "https://jsonplaceholder.typicode.com"},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
