import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../models/post";
import {PostService} from "../services/post.service";
import {map, Observable, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-post-one',
  templateUrl: './post-one.component.html',
  styleUrl: './post-one.component.css'
})
export class PostOneComponent implements OnInit{

  post: Post|undefined;
  id: number;
  user: String|undefined;
  loading: boolean = true;

  constructor(private readonly _postService: PostService,
              private readonly _userService: UserService,
              private readonly route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.loading=true;
    this._postService.getOne(this.id).subscribe({
      next:(value) => {
        this.post= value;
        this._userService.getOne(this.post.userId)
          .pipe(
            tap(value => console.log("Person name: "+value.name)),
            map(value => {
              return value.name.toUpperCase();
            })
          )
          .subscribe({
          next:(value2)=>{
            this.user=value2
          }
        })
      },

      error: (error) => alert("Il y a eu une erreur: " + error.body),

      complete: () => {
        this.loading=false;
        console.log("Recuperation terminée.");
      }
    })
  }
}
