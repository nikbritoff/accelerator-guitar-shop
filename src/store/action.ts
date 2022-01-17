import { createAction } from '@reduxjs/toolkit';
import { Screen } from '../const';
import { ActionType } from '../types/action';
import { Guitar } from '../types/guitar';

export const requestGuitars = createAction(ActionType.RequestGuitars);

export const loadGuitarsSuccess = createAction(
  ActionType.LoadGuitarsSuccess,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const loadGuitarsError = createAction(ActionType.LoadGuitarsError);

export const changeGuitarsAmount = createAction(
  ActionType.ChangeGuitarsAmount,
  (amount: number) => ({
    payload: amount,
  }),
);

export const changeScreen = createAction(
  ActionType.ChangeScreen,
  (screen: Screen) => ({
    payload: screen,
  }),
);
