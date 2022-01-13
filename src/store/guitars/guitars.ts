import { createReducer } from '@reduxjs/toolkit';
import { GuitarsList } from '../../mock/mock';
import { GuitarsData } from '../../types/state';
import { loadGuitarsError, loadGuitarsSuccess, requestGuitars } from '../action';

const initialState: GuitarsData = {
  // guitarsList: [],
  guitarsList: GuitarsList,
  guitarsLoading: false,
  guitarsError: false,
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
    });
});

export {guitars};
