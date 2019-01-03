import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthorsState} from './authors.state';

export const getAuthorsState = createFeatureSelector<AuthorsState>('authors');
export const getAuthorsData = createSelector(getAuthorsState, (state: AuthorsState) => state.data);
export const getAuthorsError = createSelector(getAuthorsState, (state: AuthorsState) => state.error);
