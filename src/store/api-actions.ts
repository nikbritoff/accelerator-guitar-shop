import { APIRoute, queryParamName } from '../const';
import { ThunkActionResult } from '../types/action';
import { changeGuitarsAmount, loadGuitarsError, loadGuitarsSuccess, loadSearchResultsSuccess, requestGuitars } from './action';

export const fetchGuitarsAction = (start: number, limit: number): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      dispatch(requestGuitars());
      const { data, headers } = await api.get(`${APIRoute.Guitars}?_start=${start}&_limit=${limit}`);
      dispatch(loadGuitarsSuccess(data));
      dispatch(changeGuitarsAmount(Number(headers['x-total-count'])));
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
      dispatch(changeGuitarsAmount(Number(headers['x-total-count'])));
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
