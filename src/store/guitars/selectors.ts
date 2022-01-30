import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitarsList = (state: State): Guitar[] => state[NameSpace.Guitars].guitarsList;
export const getGuitarsLoading = (state: State): boolean => state[NameSpace.Guitars].guitarsLoading;
export const getGuitarsError = (state: State): boolean => state[NameSpace.Guitars].guitarsError;
export const getGuitarsAmount = (state: State): number => state[NameSpace.Guitars].guitarsAmount;
export const getSearchResults = (state: State): Guitar[] => state[NameSpace.Guitars].searchResults;
export const getMinPrice = (state: State): number => state[NameSpace.Guitars].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.Guitars].maxPrice;
