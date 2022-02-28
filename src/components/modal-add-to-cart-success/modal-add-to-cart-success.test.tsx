import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import ModalAddToCartSuccess from './modal-add-to-cart-success';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore();

test('Renders modal-add-to-cart-success-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ModalAddToCartSuccess
          setIsModalAddToCartSuccessActive={jest.fn}
          history={history}
        />
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
});
