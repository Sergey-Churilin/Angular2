import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import {Subject} from 'rxjs/internal/Subject';
import {debounce, filter} from 'rxjs/operators';
import {timer} from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  private inputChange: Subject<any> = new Subject();
  searchText: string;

  constructor() {
  }

  ngOnInit() {
    this.inputChange
      .pipe(
        debounce(() => timer(300)),
        filter((v: any) => {
          if (v.length > 3) {
            return v;
          } else if (!v.length) {
            // TODO fix that
            // if return empty string, subscribe is not call
            return 'null';
          }
        })
      )
      .subscribe(v => {
          this.search.emit(v);
        },
        error => console.log(error)
      );
  }

  onFind(v) {
    this.inputChange.next(v);
  }

  ngOnDestroy() {
    this.inputChange.unsubscribe();
  }

}
