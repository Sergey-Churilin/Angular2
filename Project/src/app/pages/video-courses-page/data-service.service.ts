import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {Course} from './course.model';
import {DataServicesModule} from './data-services.module';
import {LoadingService} from '../../core/services/loading.service';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: DataServicesModule
})

export class DataService {
  private baseUrl = 'http://localhost:3000/';
  private curPage: number = 1;
  private limit: number = 3;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {
  }

  getList(): Promise<Course[]> {
    const params = `_page=${this.curPage}&_limit=${this.limit}`;
    return this.getCourses(params);
  }

  getNextPage(): Promise<Course[]> {
    this.curPage++;
    return this.getList();
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
    const body = JSON.stringify(course);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .put(`${this.baseUrl}courses/${course.id}`, body, options)
      .pipe(
        delay(1000)
      )
      .toPromise()
      .then(response => {
          this.loadingService.showLoadingBlock(false);
        return <Course>response;
      })
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });

  }

  createItem(course: Course) {
    const body = JSON.stringify(course);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(`${this.baseUrl}courses`, body, options)
      .pipe(
        delay(1000)
      )
      .toPromise()
      .then(response => {
          this.loadingService.showLoadingBlock(false);
        return <Course>response;
      })
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }

  removeItem(course: Course) {
    this.loadingService.showLoadingBlock(true);
    return this.http.delete(`${this.baseUrl}courses/${course.id}`)
      .pipe(
        delay(1000)
      )
      .toPromise()					        // Observeble to Promise
      .then(response => {
          this.loadingService.showLoadingBlock(false);
        return <Course>course;
      })
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }

  private getCourses(params): Promise<Course[]> {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses?${params}`)
      .pipe(
        delay(1000)
      )
      .toPromise()
      .then(response => {
        this.loadingService.showLoadingBlock(false);
        return <Course[]>response;
      })	   // Promise API
      .catch(error => {
        console.log('Error message');
        this.loadingService.showLoadingBlock(false);
        return Promise.reject(error.message || error);
      });
  }

  private getCourseById(id: number) {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses/${id}`)
      .pipe(
        delay(1000)
      )
      .toPromise()
      .then(response => {
          this.loadingService.showLoadingBlock(false);
        return <Course>response;
      })
      .catch(error => {
        console.log('Error message');
        this.loadingService.showLoadingBlock(false);
        return Promise.reject(error.message || error);
      });
  }
}
