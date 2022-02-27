import { createReducer } from '@reduxjs/toolkit';
import { Screen } from '../../const';
import { AppInfo } from '../../types/state';
import { addOrderItem, changeOrderItemAmount, changeScreen, deleteOrderItem, setDiscount } from '../action';


const initialState: AppInfo = {
  currentScreen: Screen.Main,
  cart: [],
  discount: {
    isActive: false,
    percent: 0,
    coupon: '',
  },
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(changeScreen, (state, action) => {
      state.currentScreen = action.payload;
    })
    .addCase(addOrderItem, (state, action) => {
      const index = state.cart.findIndex((item) => item.guitar.id === action.payload.guitar.id);
      if (index === -1) {
        state.cart = [...state.cart, action.payload];
      } else {
        state.cart[index].amount++;
      }
    })
    .addCase(deleteOrderItem, (state, action) => {
      const index = state.cart.findIndex((item) => item.guitar.id === action.payload.guitar.id);
      state.cart = [...state.cart.slice(0, index), ...state.cart.slice(index + 1)];
    })
    .addCase(changeOrderItemAmount, (state, action) => {
      const index = state.cart.findIndex((item) => item.guitar.id === action.payload.guitar.id);
      state.cart[index].amount = action.payload.amount;
    })
    .addCase(setDiscount, (state, action) => {
      state.discount = action.payload;
    });
});

export {appState};
