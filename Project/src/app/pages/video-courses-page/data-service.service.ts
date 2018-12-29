import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {Course} from './course.model';
import {DataServicesModule} from './data-services.module';
import {LoadingService} from '../../core/services/loading.service';
import {debounceTime, timeout, tap, delay} from 'rxjs/operators';

@Injectable({
  providedIn: DataServicesModule
})

export class DataService {
  private baseUrl = 'http://localhost:3000/';
  private curPage: number = 0;
  private limit: number = 3;

  constructor(
              private http: HttpClient,
              private router: Router,
              private loadingService: LoadingService
  ) { }

  getList(): Promise<Course[]> {
    const params = `_start=${this.curPage * this.limit}&_limit=${this.limit}`;
    return this.getCourses(params);
  }

  getNextPage(): Promise<Course[]> {
    this.curPage++;
    const params = `_start=${this.curPage * this.limit}&_limit=${this.limit}`;
    return this.getCourses(params);
  }

  search(query: string) {
    if (!query) {
      return this.getList();
    }
    const params = `q=${query}`;
    return this.getCourses(params);
  }

  getItemById(id: any) {
    return this.getCourseById(id);
  }

  updateItem(course: Course) {
      const url = this.router.url;
      const body = JSON.stringify(course);
      const options = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
      };

      if (url.indexOf('edit') !== -1) {
        // update
        return this.http
          .put(`${this.baseUrl}courses/${course.id}`, body, options)
          .toPromise()					        // Observeble to Promise
          .then(response => {
            setTimeout(() => {
              this.loadingService.showLoadingBlock(false);
            }, 1000);
            return <Course[]>response;
          })	   // Promise API
          .catch(error => {
            console.log('Error message');
            return Promise.reject(error.message || error); // error for the caller
          });
      } else {
        //create
        return this.http
          .post(`${this.baseUrl}courses`, body, options)
          .toPromise()					        // Observeble to Promise
          .then(response => {
            setTimeout(() => {
              this.loadingService.showLoadingBlock(false);
            }, 1000);
            return <Course[]>response;
          })	   // Promise API
          .catch(error => {
            console.log('Error message');
            return Promise.reject(error.message || error); // error for the caller
          });
      }
  }

  removeItem(course: Course) {
    this.loadingService.showLoadingBlock(true);
    return this.http.delete(`${this.baseUrl}courses/${course.id}`)
      .toPromise()					        // Observeble to Promise
      .then(response => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        return <Course[]>response;
      })	   // Promise API
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error); // error for the caller
      });
  }

  private getCourses(params): Promise<Course[]> {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses?${params}`)
      .pipe(
      timeout(2500)      )// Observable
      .toPromise()					        // Observeble to Promise
      .then(response => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        return <Course[]>response;
      })	   // Promise API
      .catch(error => {
        console.log('Error message');
        this.loadingService.showLoadingBlock(false);
        return Promise.reject(error.message || error); // error for the caller
      });
  }

  private getCourseById(id: any) {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses/${id}`)// Observable
      .toPromise()					        // Observeble to Promise
      .then(response => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000)
        return <Course>response;
      })	   // Promise API
      .catch(error => {
        console.log('Error message');
        this.loadingService.showLoadingBlock(false);
        return Promise.reject(error.message || error); // error for the caller
      });
  }

}
