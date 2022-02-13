import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Sorting from './sorting';
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
    searchResults: [],
  },
});

test('Renders sorting-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Sorting history={history}/>
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  expect(screen.getByText(/по цене/i)).toBeInTheDocument();
  expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
});
