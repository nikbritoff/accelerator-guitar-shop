import { createAction } from '@reduxjs/toolkit';
import { Screen } from '../const';
import { ActionType } from '../types/action';
import { Comment } from '../types/comment';
import { Discount } from '../types/discount';
import { Guitar } from '../types/guitar';

export const changeScreen = createAction(
  ActionType.ChangeScreen,
  (screen: Screen) => ({
    payload: screen,
  }),
);

export const addOrderItem = createAction(
  ActionType.AddOrderItem,
  (guitar: Guitar) => ({
    payload: {
      guitar,
      amount: 1,
    },
  }),
);

export const deleteOrderItem = createAction(
  ActionType.DeleteOrderItem,
  (guitar: Guitar) => ({
    payload: {
      guitar,
    },
  }),
);

export const setDiscount = createAction(
  ActionType.SetDiscount,
  (discount: Discount) => ({
    payload: discount,
  }),
);

export const changeOrderItemAmount = createAction(
  ActionType.ChangeOrderItemAmount,
  (amount: number, guitar: Guitar) => ({
    payload: {
      amount: amount,
      guitar: guitar,
    },
  }),
);

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

export const postingNewComment = createAction(
  ActionType.PostNewComment,
  (status: boolean) => ({
    payload: status,
  }),
);

export  const postNewCommentSuccess = createAction(
  ActionType.PostNewCommentSuccess,
  (status: boolean) => ({
    payload: status,
  }),
);
