import {Component, Input, OnInit, forwardRef, ViewEncapsulation, OnDestroy} from '@angular/core';

import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Author} from './author.model';
import {Store, select} from '@ngrx/store';

import {Subscription} from 'rxjs/internal/Subscription';

import {AppState} from '../../../../core/store';
import {AuthorsService} from './authors.service';

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

export class AuthorsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('authors') courseAuthors: Array<Author>;

  authors: Array<Author> = [];
  selectedAuthors: Array<Author> = [];
  isAuthorsSelectVisible: boolean = false;

  onChange: Function;
  onTouched: Function;

  authorsGroup: FormGroup;
  authorsInput: FormControl;

  private authorsSub: Subscription;

  constructor(private store: Store<AppState>, private authorsService: AuthorsService) { }

  ngOnInit() {
    this.authorsService.adjustSelectedAuthors();
    this.authorsInput = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.authorsGroup = new FormGroup({
      authorsInput: this.authorsInput
    });

    this.authorsSub = this.store.pipe(select('authors'))
      .subscribe((authors) => {
        this.authors = authors.data;
        this.selectedAuthors = authors.selectedAuthors;
      });

    this.authorsService.prepareAuthors();
  }

  ngOnDestroy() {
    this.authorsSub.unsubscribe();
  }

  onDeleteAuthor(author) {
    this.authorsService.unselectAuthor(author);
    this.onChange(this.selectedAuthors);
  }

  onSelectAuthor(params) {
    if (params.checked) {
      this.authorsService.selectAuthor(params.author);
    } else {
      this.authorsService.unselectAuthor(params.author);
    }

    this.onChange(this.selectedAuthors);
  }

  writeValue(authors: Array<Author>): void {
    if (authors && authors.length) {
      authors.forEach( a => {
        if (a.checked) {
          this.authorsService.selectAuthor(a);
        }
      });
      this.authorsService.adjustAuthors();
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
