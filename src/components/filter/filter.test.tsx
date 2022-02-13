import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Filter from './filter';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';
import { makeFakeGuitarsList } from '../../utils/mock';
import thunk from 'redux-thunk';

const mockGuitars = makeFakeGuitarsList();

const mockStore = configureMockStore([thunk]);
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
});
