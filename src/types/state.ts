import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

export type GuitarsData = {
  guitarsList: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
  guitarsAmount: number,
  searchResults: Guitar[],
};

export type State = RootState;
