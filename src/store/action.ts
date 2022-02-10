import { createAction } from '@reduxjs/toolkit';
import { Screen } from '../const';
import { ActionType } from '../types/action';
import { Comment } from '../types/comment';
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

export const loadSearchResultsSuccess = createAction(
  ActionType.LoadSearchResultsSuccess,
  (result: Guitar[]) => ({
    payload: result,
  }),
);

export const loadMinMaxPrices = createAction(
  ActionType.LoadMinMaxPrices,
  (result: Guitar[]) => ({
    payload: result,
  }),
);

export const requestGuitarInfo = createAction(ActionType.RequestGuitarInfo);

export const loadGuitarInfoSuccess = createAction(
  ActionType.LoadGuitarInfoSuccess,
  (guitarInfo: Guitar) => ({
    payload: guitarInfo,
  }),
);

export const loadGuitarInfoError = createAction(ActionType.LoadGuitarInfoError);

export const loadCommentsList = createAction(
  ActionType.LoadCommentsList,
  (result: Comment[]) => ({
    payload: result,
  }),
);
