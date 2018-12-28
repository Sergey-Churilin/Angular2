import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  @Input('authors') courseAuthors: string;

  constructor() { }

  ngOnInit() {
  }

}
