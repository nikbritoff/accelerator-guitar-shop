import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import NotFound from './not-found';
import { Screen } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Other,
    cart: [],
  },
  GUITARS: {
    searchResults: [],
  },
});


describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound history={history}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('404. Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к каталогу')).toBeInTheDocument();
  });
});
