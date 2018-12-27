import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string;
  constructor() { }

  ngOnInit() {
  }

  onFind() {
    this.search.emit(this.searchText);
    console.log(this.searchText);
  }

}
