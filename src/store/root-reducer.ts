import { combineReducers } from '@reduxjs/toolkit';
import { guitars } from './guitars/guitars';

export enum NameSpace {
  Guitars = 'GUITARS',
}

export const rootReducer = combineReducers({
  [NameSpace.Guitars]: guitars,
});

export type RootState = ReturnType<typeof rootReducer>;
