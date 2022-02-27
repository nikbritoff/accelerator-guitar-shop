import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mock';
import ModalAddToCart from './modal-add-to-cart';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';

const mockGuitar = makeFakeGuitar();

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore();

test('Renders modal-add-to-cart-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ModalAddToCart
          setIsModalAddToCartActive={jest.fn}
          guitar={mockGuitar}
        />
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
});
