import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

export type GuitarsData = {
  guitarsList: Guitar[],
  guitarsLoading: boolean,
  guitarsError: boolean,
};

export type State = RootState
