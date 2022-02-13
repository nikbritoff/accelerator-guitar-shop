import { Guitar } from '../../types/guitar';
import { guitarInfo } from './guitar-info';
import { ActionType } from '../../types/action';
import { makeFakeCommentsList, makeFakeGuitar } from '../../utils/mock';

const mockGuitarInfo = makeFakeGuitar();
const mockCommentsList = makeFakeCommentsList();

describe('Reducer: guitarInfo', () => {
  it('without additional parameters should return initial state',  () => {
    expect(guitarInfo(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update guitarInfo by load guitarInfo', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: false,
    };
    const loadGuitarInfoSuccess = {
      type: ActionType.LoadGuitarInfoSuccess,
      payload: mockGuitarInfo,
    };

    expect(guitarInfo(state, loadGuitarInfoSuccess))
      .toEqual({
        guitarInfo: mockGuitarInfo,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update guitarInfoLoading to "true"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: false,
    };
    const requestGuitarInfo = {
      type: ActionType.RequestGuitarInfo,
      payload: true,
    };

    expect(guitarInfo(state, requestGuitarInfo))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: true,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update guitarInfoLoadingError to "true"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: true,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: false,
    };
    const loadGuitarInfoError = {
      type: ActionType.LoadGuitarInfoError,
    };

    expect(guitarInfo(state, loadGuitarInfoError))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: true,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update commentsList by load commentsList', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: false,
    };
    const loadCommentsList = {
      type: ActionType.LoadCommentsList,
      payload: mockCommentsList,
    };

    expect(guitarInfo(state, loadCommentsList))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: mockCommentsList,
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update postingNewComment to "true"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: false,
    };
    const postingNewComment = {
      type: ActionType.PostNewComment,
      payload: true,
    };

    expect(guitarInfo(state, postingNewComment))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: true,
        postNewCommentSuccess: false,
      });
  });

  it('should update postingNewComment to "false"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: true,
      postNewCommentSuccess: false,
    };
    const postingNewComment = {
      type: ActionType.PostNewComment,
      payload: false,
    };

    expect(guitarInfo(state, postingNewComment))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

  it('should update postNewCommentSuccess to "true"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: true,
      postNewCommentSuccess: false,
    };
    const postNewCommentSuccess = {
      type: ActionType.PostNewCommentSuccess,
      payload: true,
    };

    expect(guitarInfo(state, postNewCommentSuccess))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: true,
      });
  });

  it('should update postNewCommentSuccess to "false"', () => {
    const state = {
      guitarInfo: {} as Guitar,
      guitarInfoLoading: false,
      guitarInfoLoadError: false,
      commentsList: [],
      postingNewComment: false,
      postNewCommentSuccess: true,
    };
    const postNewCommentSuccess = {
      type: ActionType.PostNewCommentSuccess,
      payload: false,
    };

    expect(guitarInfo(state, postNewCommentSuccess))
      .toEqual({
        guitarInfo: {} as Guitar,
        guitarInfoLoading: false,
        guitarInfoLoadError: false,
        commentsList: [],
        postingNewComment: false,
        postNewCommentSuccess: false,
      });
  });

});
