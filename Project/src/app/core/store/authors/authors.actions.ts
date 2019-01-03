import {Action} from '@ngrx/store';

import {Author} from '../../../pages/video-courses-page/components/authors/author.model';

export enum AuthorsActionTypes {
  GET_AUTHORS = '[Authors] GET_AUTHORS',
  GET_AUTHORS_SUCCESS = '[Authors] GET_AUTHORS_SUCCESS',
  GET_AUTHORS_ERROR = '[Authors] GET_AUTHORS_ERROR',
  SELECT_AUTHOR = '[Authors] SELECT_AUTHOR',
  UNSELECT_AUTHOR = '[Authors] UNSELECT_AUTHOR',
  ADJUST_AUTHORS = '[Authors] ADJUST_AUTHORS',
  ADJUST_STATE = '[Authors] ADJUST_STATE'
}

export class GetAuthors implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS;
}

export class GetAuthorsSuccess implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS_SUCCESS;

  constructor(public payload: Author[]) {
  }
}

export class GetAuthorsError implements Action {
  readonly type = AuthorsActionTypes.GET_AUTHORS_ERROR;

  constructor(public payload: Error | string) {
  }
}

export class SelectAuthor implements Action {
  readonly type = AuthorsActionTypes.SELECT_AUTHOR;

  constructor(public payload: Author) {
  }
}

export class UnselectAuthor implements Action {
  readonly type = AuthorsActionTypes.UNSELECT_AUTHOR;

  constructor(public payload: Author) {
  }
}

export class AdjustAuthors implements Action {
  readonly type = AuthorsActionTypes.ADJUST_AUTHORS;
}

export class AdjustState implements Action {
  readonly type = AuthorsActionTypes.ADJUST_STATE;
}

export type AuthorsActions =
  | GetAuthors
  | GetAuthorsSuccess
  | GetAuthorsError
  | SelectAuthor
  | UnselectAuthor
  | AdjustAuthors
  | AdjustState;
