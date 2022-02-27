import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Screen } from '../../const';
import { makeFakeGuitar } from '../../utils/mock';
import CartItem from './cart-item';

const mockGuitarInfo = makeFakeGuitar();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Other,
    cart: [{
      guitar: mockGuitarInfo,
      amount: 1,
    }],
  },
  GUITARS: {
    guitarsList: mockGuitarInfo,
  },
});

test('Renders cartItem-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <CartItem
          order={{
            guitar: mockGuitarInfo,
            amount: 1,
          }}
          setGuitarForRemoveFromCart={jest.fn}
          setIsModaRemoveFromCartActive={jest.fn}
        />
      </Router>
    </Provider>,
  );


  expect(screen.getByText(mockGuitarInfo.name)).toBeInTheDocument();
});
