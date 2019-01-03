import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {DataServicesModule} from '../../data-services.module';
import {Author} from './author.model';

@Injectable({
  providedIn: DataServicesModule
})

export class AuthorsService {
  private baseUrl = 'http://localhost:3000/';

  constructor( private http: HttpClient ) {}


   getAuthors(): Promise<Author[]> {
    return this.http.get(`${this.baseUrl}authors`)
      .toPromise()
      .then(response => {
        return <Author[]>response;
      })
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }
}
