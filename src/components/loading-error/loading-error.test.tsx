import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import LoadingError from './loading-error';
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
  },
  GUITARS: {
    guitarsList: mockGuitars,
    guitarsError: true,
  },
});

test('Renders loadingError-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <LoadingError/>
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Ошибка загрузки данных/i)).toBeInTheDocument();
});
