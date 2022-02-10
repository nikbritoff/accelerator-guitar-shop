import { RootState } from '../store/root-reducer';
import { Comment } from './comment';
import { Guitar } from './guitar';

export type GuitarsData = {
  guitarsList: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
  guitarsAmount: number,
  searchResults: Guitar[],
  minPrice: number,
  maxPrice: number,
};

export type GuitarInfo = {
  guitarInfo: Guitar,
  guitarInfoLoading: boolean,
  guitarInfoLoadError: boolean,
  commentsList: Comment[],
}

export type State = RootState;
