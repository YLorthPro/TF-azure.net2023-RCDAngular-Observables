import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../models/post";
import {debounceTime, interval, map, Observable, startWith, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit, OnDestroy{

  posts: Post[]|undefined;

  // Subject pour gérer la désinscription
  destroyed= new Subject<boolean>;

  loading = false;

  public filteredOptions!: Observable<string[]>;

  public myControl = new FormControl('');

  constructor(private readonly _postService: PostService,
              private readonly _router: Router) {
  }


  // Méthode appelée lors de la destruction du component
  ngOnDestroy(): void {
    // Complète le Subject, ce qui émet une valeur(true ici)
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.loading= true;

    /*
    pipe: sert à appliquer une série d'opérateurs à un observable
    pour effectuer différentes opérations: (transformations, filtrages,...)
     */
    this._postService.getAll().pipe(
      /*
      Applique le filtre pour garder uniquement les posts avec userId égal à 1
      map pour appliquer à chaque élément du flux
      filter pour filtrer selon un prédicat
       */
      map(posts => posts.filter(post => post.userId === 1)),
      // take: prendre que 10 éléments
      take(10),
      // Se désabonne lorsque le Subject destroyed émet une valeur (lors du onDestroy)
      takeUntil(this.destroyed)
      //abonnement à l'observable
    ).subscribe({

      // Si nouvelle valeur émise, affecte cette valeur à posts
      next: (value) => this.posts = value,

      // Si d'erreur, affiche une alerte
      error: (error) => alert("Il y a eu une erreur: " + error.body),

      // Lorsque le flux est complet, affiche un message dans la console
      complete: () => {
        this.loading= false;
        console.log("Recuperation de la liste terminée.");

        this.filteredOptions = this.myControl.valueChanges.pipe(
          debounceTime(500),
          startWith(''),
          map(value => this._filter(value))
        );
      }
    });
  }

  private _filter(value: string | null): string[] {
    if (value && this.posts) {
      const filterValue = value.toLowerCase();
      return this.posts
        .map(post => post.title)
        .filter(postTitle => postTitle.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }

  OnPostSelected(selection: string){

    console.log("Titre selectionné: "+selection)

  }

}
