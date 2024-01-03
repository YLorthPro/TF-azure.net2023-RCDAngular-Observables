import {Component, OnInit} from '@angular/core';
import {interval, Observable, startWith, switchMap, tap} from "rxjs";
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users$?: Observable<User[]>;
  time: Date;

  constructor(private readonly _userService: UserService) {
    this.time = new Date();
  }

  ngOnInit(): void {
    this.users$ = interval(1000).pipe(
      //L'observable commence à émettre à partir de la valeur 0 immédiatement.
      startWith(0),
      /*
      L'opérateur switchMap prend chaque valeur émise par
      l'observable interval et la mappe sur le résultat de la méthode _userService.getAll().
      Si une nouvelle valeur est émise par l'observable interval avant que l'appel précédent à
      _userService.getAll() ne soit terminé, l'appel précédent est annulé en faveur du nouveau.
      La propriété this.users est affectée à l'observable retourné par _userService.getAll().
       */
      switchMap(() => this._userService.getAll()),
      //Attribue nouvelle valeur à time
      tap(() => this.time = new Date())
    );
  }
}
