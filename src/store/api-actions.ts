import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { changeGuitarsAmount, loadGuitarsError, loadGuitarsSuccess, requestGuitars } from './action';

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
