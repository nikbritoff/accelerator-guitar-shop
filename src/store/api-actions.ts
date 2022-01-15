import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { loadGuitarsError, loadGuitarsSuccess, requestGuitars } from './action';

export const fetchGuitarsAction = (): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      dispatch(requestGuitars());
      const { data } = await api.get(APIRoute.Guitars);
      dispatch(loadGuitarsSuccess(data));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  }
);
