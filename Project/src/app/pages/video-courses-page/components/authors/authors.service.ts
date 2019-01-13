import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/internal/Observable';

import {DataServicesModule} from '../../data-services.module';
import {Author} from './author.model';

@Injectable({
  providedIn: DataServicesModule
})

export class AuthorsService {
  private baseUrl = 'http://localhost:3000/';

  constructor( private http: HttpClient ) {}


   getAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}authors`);
  }
}
