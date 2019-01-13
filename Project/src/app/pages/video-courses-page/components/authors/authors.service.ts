import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';

import {DataServicesModule} from '../../data-services.module';
import * as AuthorsActions from '../../../../core/store/authors/authors.actions';
import {AppState} from '../../../../core/store';

@Injectable({
  providedIn: DataServicesModule
})

export class AuthorsService {
  private baseUrl = 'http://localhost:3000/';

  constructor( private http: HttpClient, private store: Store<AppState> ) {}

  prepareAuthors() {
    this.store.dispatch(new AuthorsActions.GetAuthors());
  }

  adjustSelectedAuthors() {
    this.store.dispatch(new AuthorsActions.AdjustState());
  }

  adjustAuthors() {
    this.store.dispatch(new AuthorsActions.AdjustAuthors());
  }

  unselectAuthor(author) {
    this.store.dispatch(new AuthorsActions.UnselectAuthor(author));
  }

  selectAuthor(author) {
    this.store.dispatch(new AuthorsActions.SelectAuthor(author));
  }

  getAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}authors`);
  }
}
