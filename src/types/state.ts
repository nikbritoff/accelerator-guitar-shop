import { Screen } from '../const';
import { RootState } from '../store/root-reducer';
import { Comment } from './comment';
import { Discount } from './discount';
import { Guitar } from './guitar';
import { Order } from './order';

export type AppInfo = {
  currentScreen: Screen,
  cart: Order[],
  discount: Discount,
}

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
  postingNewComment: boolean,
  postNewCommentSuccess: boolean,
}

export type State = RootState;
