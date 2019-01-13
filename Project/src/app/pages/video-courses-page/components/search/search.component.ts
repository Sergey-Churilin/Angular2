import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {debounce, filter} from 'rxjs/operators';
import {timer} from 'rxjs/internal/observable/timer';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchGroup: FormGroup;
  private valueChangeSub: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.searchGroup = new FormGroup({
      searchInput: new FormControl()
    });

    this.valueChangeSub = this.searchGroup.valueChanges
      .pipe(
        debounce(() => timer(300)),
        filter((v: any) => {
          if (v.searchInput.length > 3) {
            return v;
          } else if (!v.searchInput.length) {
            // TODO fix that
            // if return empty string, subscribe is not call
            return 'null';
          }
        })
      )
      .subscribe(v => {
          this.search.emit(v.searchInput);
        },
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.valueChangeSub.unsubscribe();
  }

}
