import { createAction } from '@reduxjs/toolkit';
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
