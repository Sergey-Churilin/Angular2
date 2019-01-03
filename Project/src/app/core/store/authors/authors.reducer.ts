import {AuthorsActionTypes, AuthorsActions} from './authors.actions';
import {AuthorsState, initialAuthorsState} from './authors.state';
import {Author} from '../../../pages/video-courses-page/components/authors/author.model';

export function authorsReducer(state = initialAuthorsState, action: AuthorsActions): AuthorsState {
  switch (action.type) {
    case AuthorsActionTypes.GET_AUTHORS: {
      return {
        ...state,
        loading: true
      };
    }
    case AuthorsActionTypes.GET_AUTHORS_SUCCESS: {
      const data = [...<Array<Author>>action.payload];
      const selectedAuthors = state.selectedAuthors;
      !!selectedAuthors.length && adjustAuthors(data, selectedAuthors);

      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }
    case AuthorsActionTypes.GET_AUTHORS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case AuthorsActionTypes.SELECT_AUTHOR: {
      const author = action.payload;
      const selectedAuthors = state.selectedAuthors;
      selectedAuthors.push(author);
      return {
        ...state,
        selectedAuthors
      };
    }
    case AuthorsActionTypes.UNSELECT_AUTHOR: {
      const author = action.payload;
      const selectedAuthors = state.selectedAuthors;
      let index;
      selectedAuthors.forEach((a, i) => {
        if (a.id === author.id) {
          index = i;
        }
      });
      selectedAuthors.splice(index, 1);
      const data = state.data;
      adjustAuthors(data, selectedAuthors);
      return {
        ...state,
        data,
        selectedAuthors
      };
    }
    case AuthorsActionTypes.ADJUST_AUTHORS: {
      const data = state.data;
      const selectedAuthors = state.selectedAuthors;
      adjustAuthors(data, selectedAuthors);
      return {
        ...state,
        selectedAuthors
      };
    }
    case AuthorsActionTypes.ADJUST_STATE: {
      const selectedAuthors = [];
      return {
        ...state,
        selectedAuthors
      };
    }

    default:
      return state;
  }
}

function adjustAuthors(authors, selectedAuthors) {
    authors.forEach(a => {
      a.checked = false;
      if (selectedAuthors.length) {
        selectedAuthors.forEach (sA => {
          if (a.id === sA.id) {
            a.checked = true;
          }
        });
      }
    });
}
