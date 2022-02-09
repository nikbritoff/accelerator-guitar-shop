import { combineReducers } from '@reduxjs/toolkit';
import { appState } from './app-state/app-state';
import { guitarInfo } from './guitar-info/guitar-info';
import { guitars } from './guitars/guitars';

export enum NameSpace {
  App = 'APP',
  Guitars = 'GUITARS',
  GuitarInfo = 'GUITAR_INFO',
}

export const rootReducer = combineReducers({
  [NameSpace.App]: appState,
  [NameSpace.Guitars]: guitars,
  [NameSpace.GuitarInfo]: guitarInfo,
});

export type RootState = ReturnType<typeof rootReducer>;
