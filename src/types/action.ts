import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';
import { Action } from 'redux';

export enum ActionType {
  ChangeScreen = 'app/changeScreen',
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
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
