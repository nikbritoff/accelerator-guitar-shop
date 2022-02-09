import { RootState } from '../store/root-reducer';
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
}

export type State = RootState;
