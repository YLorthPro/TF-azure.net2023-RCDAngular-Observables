import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PostOneComponent } from './post-one/post-one.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {coucouInterceptor} from "./coucou.interceptor";

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
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide : "urlAPI", useValue : "https://jsonplaceholder.typicode.com"},
    { provide: HTTP_INTERCEPTORS, useClass: coucouInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
