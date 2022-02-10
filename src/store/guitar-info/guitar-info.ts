import { createReducer } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { GuitarInfo } from '../../types/state';
import { loadGuitarInfoError, loadGuitarInfoSuccess, requestGuitarInfo, loadCommentsList } from '../action';

const initialState: GuitarInfo = {
  guitarInfo: {} as Guitar,
  guitarInfoLoading: false,
  guitarInfoLoadError: false,
  commentsList: [],
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
    });
});

export {guitarInfo};
