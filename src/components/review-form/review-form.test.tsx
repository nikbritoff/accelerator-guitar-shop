import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Guitar } from '../../types/guitar';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  GUITAR_INFO: {
    guitarInfo: {} as Guitar,
    guitarInfoLoading: false,
    guitarInfoLoadError: false,
    commentsList: [],
    postingNewComment: false,
    postNewCommentSuccess: false,
  },
});

const mockProps = {
  id: '1',
  guitarName: 'Гитара цоя',
};

test('Renders modal-review-form-component', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ReviewForm
          setIsReviewModalActive={jest.fn}
          setIsReviewModalSuccessActive={jest.fn}
          id={mockProps.id}
          guitarName={mockProps.guitarName}
          setShownCommentsAmount={jest.fn}
          shownCommentsAmount={3}
        />
      </Router>
    </Provider>,
  );

  expect(screen.getByText(mockProps.guitarName)).toBeInTheDocument();
  expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
