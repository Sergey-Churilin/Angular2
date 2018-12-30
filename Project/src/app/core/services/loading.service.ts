import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/internal/Subject';

import {CoreModule} from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LoadingService {
  showLoading: Subject<boolean> = new Subject();
  constructor() { }

  showLoadingBlock(show) {
    this.showLoading.next(show);
  }
}
