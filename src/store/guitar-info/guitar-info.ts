import { createReducer } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { GuitarInfo } from '../../types/state';
import { loadGuitarInfoError, loadGuitarInfoSuccess, requestGuitarInfo, loadCommentsList, postingNewComment, postNewCommentSuccess } from '../action';

const initialState: GuitarInfo = {
  guitarInfo: {} as Guitar,
  guitarInfoLoading: false,
  guitarInfoLoadError: false,
  commentsList: [],
  postingNewComment: false,
  postNewCommentSuccess: false,
};

const guitarInfo = createReducer(initialState, (builder) => {
  builder
    .addCase(requestGuitarInfo, (state) => {
      state.guitarInfoLoading = true;
    })
    .addCase(loadGuitarInfoSuccess, (state, action) => {
      state.guitarInfoLoading = false;
      state.guitarInfoLoadError = false;
      state.guitarInfo = action.payload;
    })
    .addCase(loadGuitarInfoError, (state) => {
      state.guitarInfoLoading = false;
      state.guitarInfoLoadError = true;
    })
    .addCase(loadCommentsList, (state, action) => {
      state.commentsList = action.payload;
    })
    .addCase(postingNewComment, (state, action) => {
      state.postingNewComment = action.payload;
      state.postNewCommentSuccess = false;
    })
    .addCase(postNewCommentSuccess, (state, action) => {
      state.postingNewComment = false;
      state.postNewCommentSuccess = action.payload;
    });
});

export {guitarInfo};
