import { Screen } from '../../const';
import { ActionType } from '../../types/action';
import { makeFakeGuitar } from '../../utils/mock';
import { appState } from './app-state';

const mockGuitarInfo = makeFakeGuitar();

describe('Reducer: appState', () => {
  it('without additional parameters should return initial state',  () => {
    expect(appState(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentScreen: Screen.Main,
        cart: [],
        discount: {
          isActive: false,
          percent: 0,
          coupon: '',
        },
      });
  });

  it('should update cart by add order item',  () => {
    const state = {
      currentScreen: Screen.Main,
      cart: [],
      discount: {
        isActive: false,
        percent: 0,
        coupon: '',
      },
    };
    const addOrderItem = {
      type: ActionType.AddOrderItem,
      payload: {
        guitar: mockGuitarInfo,
        amount: 1,
      },
    };

    expect(appState(state, addOrderItem))
      .toEqual({
        currentScreen: Screen.Main,
        cart: [{
          guitar: mockGuitarInfo,
          amount: 1,
        }],
        discount: {
          isActive: false,
          percent: 0,
          coupon: '',
        },
      });
  });

  it('should update cart by delete order item',  () => {
    const state = {
      currentScreen: Screen.Main,
      cart: [{
        guitar: mockGuitarInfo,
        amount: 1,
      }],
      discount: {
        isActive: false,
        percent: 0,
        coupon: '',
      },
    };
    const deleteOrderItem = {
      type: ActionType.DeleteOrderItem,
      payload: {
        guitar: mockGuitarInfo,
      },
    };

    expect(appState(state, deleteOrderItem))
      .toEqual({
        currentScreen: Screen.Main,
        cart: [],
        discount: {
          isActive: false,
          percent: 0,
          coupon: '',
        },
      });
  });

  it('should update cart by change order item amount',  () => {
    const state = {
      currentScreen: Screen.Main,
      cart: [{
        guitar: mockGuitarInfo,
        amount: 10,
      }],
      discount: {
        isActive: false,
        percent: 0,
        coupon: '',
      },
    };
    const changeOrderItemAmount = {
      type: ActionType.ChangeOrderItemAmount,
      payload: {
        guitar: mockGuitarInfo,
        amount: 3,
      },
    };

    expect(appState(state, changeOrderItemAmount))
      .toEqual({
        currentScreen: Screen.Main,
        cart: [{
          guitar: mockGuitarInfo,
          amount: 3,
        }],
        discount: {
          isActive: false,
          percent: 0,
          coupon: '',
        },
      });
  });

  it('should update discount by set discount',  () => {
    const state = {
      currentScreen: Screen.Main,
      cart: [],
      discount: {
        isActive: false,
        percent: 0,
        coupon: '',
      },
    };
    const setDiscount = {
      type: ActionType.SetDiscount,
      payload: {
        isActive: true,
        percent: 10,
        coupon: 'light-333',
      },
    };

    expect(appState(state, setDiscount))
      .toEqual({
        currentScreen: Screen.Main,
        cart: [],
        discount: {
          isActive: true,
          percent: 10,
          coupon: 'light-333',
        },
      });
  });

});
