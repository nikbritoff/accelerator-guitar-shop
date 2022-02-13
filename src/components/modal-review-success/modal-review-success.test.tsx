import { render, screen } from '@testing-library/react';
import ModalReviewSuccess from './modal-review-success';

test('Renders modal-review-success-component', () => {
  render(
    <ModalReviewSuccess setIsModalReviewSuccessActive={jest.fn}/>,
  );

  expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
});
