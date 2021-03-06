import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';
import { Action } from 'redux';

export enum ActionType {
  ChangeScreen = 'app/changeScreen',
  AddOrderItem = 'app/addOrderItem',
  DeleteOrderItem = 'app/deleteOrderItem',
  ChangeOrderItemAmount = 'app/changeOrderItemAmount',
  SetDiscount = 'app/setDiscount',
  RequestGuitars = 'guitars/request',
  LoadGuitarsSuccess = 'guitars/loadSuccess',
  LoadGuitarsError = 'guitars/loadError',
  ChangeGuitarsAmount = 'guitars/changeAmount',
  LoadSearchResultsSuccess = 'search/loadSuccess',
  LoadMinMaxPrices = 'guitars/loadPrices',
  RequestGuitarInfo = 'guitar/request',
  LoadGuitarInfoSuccess = 'guitar/loadSuccess',
  LoadGuitarInfoError = 'guitar/loadError',
  LoadCommentsList = 'guitar/requestCommentsList',
  PostNewComment = 'guitar/postNewComment',
  PostNewCommentSuccess = 'guitar/postNewCommentSuccess',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
