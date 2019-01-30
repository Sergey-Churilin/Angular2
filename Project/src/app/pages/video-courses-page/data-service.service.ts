import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {delay, tap, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';

import {Course} from './course.model';
import {DataServicesModule} from './data-services.module';
import {LoadingService} from '../../core/services/loading.service';

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

  getList(): Observable<Course[]> {
    const params = `_page=${this.curPage}&_limit=${this.limit}`;
    return this.getCourses(params);
  }

  getNextPage(): Observable<Course[]> {
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

  updateItem(course: Course): Observable<any> {
    const body = JSON.stringify(course);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .put(`${this.baseUrl}courses/${course.id}`, body, options)
      .pipe(
        delay(1000), // to simulate response delay
        tap(() => {
          this.loadingService.showLoadingBlock(false);
        })
      );

  }

  createItem(course: Course): Observable<any> {
    const body = JSON.stringify(course);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(`${this.baseUrl}courses`, body, options)
      .pipe(
        delay(1000), // to simulate response delay
        tap(() => {
          this.loadingService.showLoadingBlock(false);
        })
      );
  }

  removeItem(course: Course): Observable<any> {
    this.loadingService.showLoadingBlock(true);
    return this.http.delete(`${this.baseUrl}courses/${course.id}`)
      .pipe(
        delay(1000), // to simulate response delay
        tap(() => this.loadingService.showLoadingBlock(false)),
        map(() => of(course))
      );
  }

  private getCourses(params): Observable<any> {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses?${params}`)
      .pipe(
        delay(1000), // to simulate response delay
        tap(() => {
          this.loadingService.showLoadingBlock(false);
        })
      );
  }

  private getCourseById(id: number): Observable<any> {
    this.loadingService.showLoadingBlock(true);
    return this.http.get(`${this.baseUrl}courses/${id}`)
      .pipe(
        delay(1000), // to simulate response delay
        tap(() => {
          this.loadingService.showLoadingBlock(false);
        })
      );
  }
}
