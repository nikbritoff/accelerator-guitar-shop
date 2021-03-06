import { toast } from 'react-toastify';
import { APIRoute, COUNT_TOKEN_NAME, queryParamName } from '../const';
import {  ThunkActionResult } from '../types/action';
import { Comment } from '../types/comment';
import { NewComment } from '../types/new-comment';
import { changeGuitarsAmount, loadCommentsList, loadGuitarInfoError, loadGuitarInfoSuccess, loadGuitarsError, loadGuitarsSuccess, loadMinMaxPrices, loadSearchResultsSuccess, postingNewComment, postNewCommentSuccess, requestGuitarInfo, requestGuitars, setDiscount } from './action';
import { NameSpace } from './root-reducer';

const errorMessages = {
  commentsList: 'Ошибка загрузки комментариев. Повторите попытку позже.',
  postNewComment: 'Оставить отзыв не удалось. Повторите попытку позже.',
};

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

export const fetchDataAction = (url: string): ThunkActionResult => (
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

export const fetchGuitarInfoCommentsList = (id: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      const { data } = await api.get(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
      dispatch(loadCommentsList(data));
    }
    catch {
      toast.warn(errorMessages.commentsList);
    }
  }
);

export const postNewComment = (newComment: NewComment): ThunkActionResult => (
  async (dispatch, getState, api) => {
    try {
      dispatch(postingNewComment(true));
      const {data} = await api.post<Comment>(`${APIRoute.Comments}`, newComment);
      const commentsList = getState()[NameSpace.GuitarInfo].commentsList;
      dispatch(loadCommentsList([data, ...commentsList]));
      dispatch(postNewCommentSuccess(true));
    }
    catch {
      toast.warn(errorMessages.postNewComment);
      dispatch(postingNewComment(false));
    }
  }
);

export const checkCoupon = (coupon: string): ThunkActionResult => (
  async (dispatch, _, api) => {
    try {
      const {data} = await api.post(`${APIRoute.Coupons}`, {coupon: coupon});
      dispatch(setDiscount({
        isActive: true,
        percent: data,
        coupon: coupon,
      }));
    }
    catch {
      dispatch(setDiscount({
        isActive: false,
        percent: 0,
        coupon: coupon,
      }));
    }
  }
);
