import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _urlPost : string = this._urlBase+'/users'

  constructor(@Inject('urlAPI') private _urlBase : string,
              private _httpClient: HttpClient) { }


  getOne(id: number): Observable<User>{
    return this._httpClient.get<User>(this._urlPost+`/${id}`);
  }

  getAll(){
    return this._httpClient.get<User[]>(this._urlPost)
  }
}
