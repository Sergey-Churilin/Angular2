import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';

import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  show: boolean = false;
  private loadingSub: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingSub = this.loadingService.showLoading
      .subscribe((show) => this.show = show);
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
