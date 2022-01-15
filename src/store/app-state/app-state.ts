import { createReducer } from '@reduxjs/toolkit';
import { Screen } from '../../const';
import { changeScreen } from '../action';

const initialState = {
  currentScreen: Screen.Catalog,
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(changeScreen, (state, action) => {
      state.currentScreen = action.payload;
    });
});

export {appState};
