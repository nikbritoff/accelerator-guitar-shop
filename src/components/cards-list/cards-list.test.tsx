import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CardsList from './cards-list';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';
import { makeFakeGuitar, makeFakeGuitarsList } from '../../utils/mock';

const mockGuitars = makeFakeGuitarsList();
const mockGuitarIndo = makeFakeGuitar();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Catalog,
    cart: [{
      guitar: mockGuitarIndo,
      amount: 1,
    }],
  },
  GUITARS: {
    guitarsList: mockGuitars,
  },
});

test('Renders cardsList-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <CardsList guitarsList={mockGuitars} setGuitarForCart={jest.fn} setIsModalAddToCartActive={jest.fn}/>
      </Router>
    </Provider>,
  );

  mockGuitars.forEach((guitar) => {
    expect(screen.getByText(guitar.price)).toBeInTheDocument();
    expect(screen.getByText(guitar.name)).toBeInTheDocument();
  });
});
