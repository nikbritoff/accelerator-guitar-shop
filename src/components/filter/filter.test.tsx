import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Filter from './filter';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';
import { makeFakeGuitarsList } from '../../utils/mock';

const mockGuitars = makeFakeGuitarsList();
const minPrice = mockGuitars[0];
const maxPrice = mockGuitars[mockGuitars.length - 1];

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Catalog,
  },
  GUITARS: {
    guitarsList: mockGuitars,
    minPrice: mockGuitars[0],
    maxPrice: mockGuitars[mockGuitars.length - 1],
  },
});

test('Renders filter-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Filter history={history}/>
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(String(minPrice))).toBeInTheDocument();
  expect(screen.getByPlaceholderText(String(maxPrice))).toBeInTheDocument();
});
