import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Pagination from './pagination';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Catalog,
  },
  GUITARS: {
    guitarsAmount: 27,
  },
});

describe('Renders pagination-component', () => {
  it('should render correct if current page is 1',  () => {
    const CURRENT_PAGE = 1;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination currentPage={CURRENT_PAGE}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correct if current page is last',  () => {
    const CURRENT_PAGE = 3;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination currentPage={CURRENT_PAGE}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });
});
