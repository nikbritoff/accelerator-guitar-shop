import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Footer from './footer';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

test('Renders footer-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Footer/>
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
  expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
  expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
});
