import { APIRoute, COUNT_TOKEN_NAME, queryParamName } from '../const';
import {  ThunkActionResult } from '../types/action';
import { changeGuitarsAmount, loadGuitarInfoError, loadGuitarInfoSuccess, loadGuitarsError, loadGuitarsSuccess, loadMinMaxPrices, loadSearchResultsSuccess, requestGuitarInfo, requestGuitars } from './action';

export const fetchGuitarsAction = (start: number, limit: number): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      dispatch(requestGuitars());
      const { data, headers } = await api.get(`${APIRoute.Guitars}?${queryParamName.Start}=${start}&${queryParamName.Limit}=${limit}`);
      dispatch(loadGuitarsSuccess(data));
      dispatch(changeGuitarsAmount(Number(headers[COUNT_TOKEN_NAME])));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  }
);

export const fetcDataAction = (url: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      dispatch(requestGuitars());
      const { data, headers } = await api.get(url);
      dispatch(loadGuitarsSuccess(data));
      dispatch(changeGuitarsAmount(Number(headers[COUNT_TOKEN_NAME])));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  }
);

export const fetchSearchResults = (value: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    const { data } = await api.get(`${APIRoute.Guitars}?${queryParamName.NameLike}=${value}`);
    dispatch(loadSearchResultsSuccess(data));
  }
);

export const fetchMinMaxPrice = (url: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      const { data } = await api.get(url);
      dispatch(loadMinMaxPrices(data));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  }
);

export const fetchGuitarInfo = (id: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      dispatch(requestGuitarInfo());
      const { data } = await api.get(`${APIRoute.Guitars}/${id}`);
      dispatch(loadGuitarInfoSuccess(data));
    }
    catch {
      dispatch(loadGuitarInfoError());
    }
  }
);
