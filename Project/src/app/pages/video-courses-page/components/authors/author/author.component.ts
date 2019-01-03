import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Author} from '../author.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;
  @Input() showCheckbox: boolean;
  @Output() delete: EventEmitter<Author> = new EventEmitter<Author>();
  @Output() select: EventEmitter<object> = new EventEmitter<object>();
  isCheckboxVisible: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.isCheckboxVisible = this.showCheckbox;
  }

  onDeleteAuthor() {
    this.author.checked = false;
    this.delete.emit(this.author);
  }

  onCheck(isChecked) {
    this.author.checked = isChecked;
    this.select.emit({author: this.author, checked: isChecked});
  }

}
