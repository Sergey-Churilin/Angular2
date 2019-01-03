import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Subject} from 'rxjs/internal/Subject';
import {debounce, filter} from 'rxjs/operators';
import {timer} from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.searchGroup = new FormGroup({
      searchInput: new FormControl()
    });

    this.searchGroup.valueChanges
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

}
