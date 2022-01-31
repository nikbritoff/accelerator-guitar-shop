import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { changeGuitarsAmount, loadGuitarsError, loadGuitarsSuccess, loadMinMaxPrices, loadSearchResultsSuccess, requestGuitars } from '../action';

const initialState: GuitarsData = {
  guitarsList: [],
  guitarsLoading: false,
  guitarsError: false,
  guitarsAmount: 0,
  searchResults: [],
  minPrice: 0,
  maxPrice: 100000,
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
    })
    .addCase(loadSearchResultsSuccess, (state, action) => {
      state.searchResults = action.payload;
    })
    .addCase(loadMinMaxPrices, (state, action) => {
      state.minPrice = action.payload[0].price;
      state.maxPrice= action.payload[action.payload.length - 1].price;
    });
});

export {guitars};
