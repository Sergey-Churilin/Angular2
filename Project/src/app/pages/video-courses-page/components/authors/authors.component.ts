import {Component, Input, OnInit, forwardRef, ViewEncapsulation} from '@angular/core';
// import {ViewEncapsulation} from '@angular/cli/lib/config/schema';

import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Author} from './author.model';
import {Store, select} from '@ngrx/store';

import {AppState} from '../../../../core/store';
import * as AuthorsActions from '../../../../core/store/authors/authors.actions';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})

export class AuthorsComponent implements OnInit, ControlValueAccessor {
  @Input('authors') courseAuthors: Array<Author>;

  authors: Array<Author> = [];
  selectedAuthors: Array<Author> = [];
  isAuthorsSelectVisible: boolean = false;

  onChange: Function;
  onTouched: Function;

  authorsGroup: FormGroup;
  authorsInput: FormControl;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AuthorsActions.AdjustState());
    this.authorsInput = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.authorsGroup = new FormGroup({
      authorsInput: this.authorsInput
    });

    this.store.pipe(select('authors'))
      .subscribe((authors) => {
        this.authors = authors.data;
        this.selectedAuthors = authors.selectedAuthors;
      });

    // get list of authors
    this.store.dispatch(new AuthorsActions.GetAuthors());
  }

  onDeleteAuthor(author) {
    this.store.dispatch(new AuthorsActions.UnselectAuthor(author));
    this.onChange(this.selectedAuthors);
  }

  onSelectAuthor(params) {
    if (params.checked) {
      this.store.dispatch(new AuthorsActions.SelectAuthor(params.author));
    } else {
      this.store.dispatch(new AuthorsActions.UnselectAuthor(params.author));
    }

    this.onChange(this.selectedAuthors);
  }

  writeValue(authors: Array<Author>): void {
    if (authors && authors.length) {
      authors.forEach( a => {
        a.checked && this.store.dispatch(new AuthorsActions.SelectAuthor(a));
      });
      this.store.dispatch(new AuthorsActions.AdjustAuthors());
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  hasError() {
    if (this.authorsInput.touched && this.authorsInput.errors && !this.selectedAuthors.length) {
      return true;
    }
  }

  showAuthorsSelect() {
    this.isAuthorsSelectVisible = !this.isAuthorsSelectVisible;
  }
}
