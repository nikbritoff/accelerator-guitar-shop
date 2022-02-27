import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Header from './header';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';
import { makeFakeGuitarsList } from '../../utils/mock';

const mockGuitars = makeFakeGuitarsList();

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Catalog,
    cart: [],
  },
  GUITARS: {
    guitarsList: mockGuitars,
    searchResults: [],
  },
});

test('Renders header-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Header history={history}/>
      </Router>
    </Provider>,
  );

  expect(screen.getByText(Screen.Catalog)).toBeInTheDocument();
  expect(screen.getByText(Screen.About)).toBeInTheDocument();
  expect(screen.getByText(Screen.WhereBuy)).toBeInTheDocument();
  expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
});
