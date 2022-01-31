import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Search from './search';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Screen } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  APP: {
    currentScreen: Screen.Other,
  },
  GUITARS: {
    searchResults: [],
  },
});

test('Renders search-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Search history={history}/>
      </Router>
    </Provider>,
  );
  const textElement = screen.getByPlaceholderText(/что вы ищите?/i);
  expect(textElement).toBeInTheDocument();
});
