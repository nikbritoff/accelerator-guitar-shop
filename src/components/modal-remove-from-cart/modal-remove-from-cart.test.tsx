import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeGuitar } from '../../utils/mock';
import ModalRemoveFromCart from './modal-remove-from-cart';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';

const mockGuitar = makeFakeGuitar();

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore();

test('Renders modal-remove-ftom-cart-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ModalRemoveFromCart
          setIsModaRemoveFromCartActive={jest.fn}
          guitar={mockGuitar}
        />
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
});
