import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _urlPost : string = this._urlBase+'/posts'

  constructor(@Inject('urlAPI') private _urlBase : string,
              private _httpClient: HttpClient) { }

  getAll(): Observable<Post[]>{
    return this._httpClient.get<Post[]>(this._urlPost)
  }

  getOne(id: number): Observable<Post>{
    return this._httpClient.get<Post>(this._urlPost+`/${id}`);
  }
}
