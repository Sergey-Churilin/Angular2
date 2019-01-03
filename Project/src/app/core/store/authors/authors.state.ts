import {Author} from '../../../pages/video-courses-page/components/authors/author.model';

export interface AuthorsState {
  data: ReadonlyArray<Author>;
  selectedAuthors: ReadonlyArray<Author>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialAuthorsState = {
  data: [],
  selectedAuthors: [],
  loading: false,
  loaded: false,
  error: null
};
