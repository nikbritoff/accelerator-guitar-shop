import { Screen } from '../../const';
import { Order } from '../../types/order';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCurrentScreen = (state: State): Screen => state[NameSpace.App].currentScreen;
export const getCart = (state: State): Order[] => state[NameSpace.App].cart;
