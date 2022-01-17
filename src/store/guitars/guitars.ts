import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { changeGuitarsAmount, loadGuitarsError, loadGuitarsSuccess, requestGuitars } from '../action';

const initialState: GuitarsData = {
  guitarsList: [],
  guitarsLoading: false,
  guitarsError: false,
  guitarsAmount: 0,
};

const guitars = createReducer(initialState, (builder) => {
  builder
    .addCase(requestGuitars, (state) => {
      state.guitarsLoading = true;
    })
    .addCase(loadGuitarsSuccess, (state, action) => {
      state.guitarsList = action.payload;
      state.guitarsLoading = false;
      state.guitarsError = false;
    })
    .addCase(loadGuitarsError, (state) => {
      state.guitarsLoading = false;
      state.guitarsError = true;
    })
    .addCase(changeGuitarsAmount, (state, action) => {
      state.guitarsAmount = action.payload;
    });
});

export {guitars};
