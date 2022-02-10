import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitarInfo = (state: State) => state[NameSpace.GuitarInfo].guitarInfo;
export const getGuitarInfoLoading = (state: State) => state[NameSpace.GuitarInfo].guitarInfoLoading;
export const getGuitarInfoError = (state: State) => state[NameSpace.GuitarInfo].guitarInfoLoadError;
export const getCommentsList = (state: State) => state[NameSpace.GuitarInfo].commentsList;
