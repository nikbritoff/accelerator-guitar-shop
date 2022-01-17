import { Screen } from '../../const';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCurrentScreen = (state: State): Screen => state[NameSpace.App].currentScreen;
