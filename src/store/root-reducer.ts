import { combineReducers } from '@reduxjs/toolkit';
import { appState } from './app-state/app-state';
import { guitars } from './guitars/guitars';

export enum NameSpace {
  App = 'APP',
  Guitars = 'GUITARS',
}

export const rootReducer = combineReducers({
  [NameSpace.App]: appState,
  [NameSpace.Guitars]: guitars,
});

export type RootState = ReturnType<typeof rootReducer>;
