import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { makeFakeCommentsList } from '../../utils/mock';

const mockCommentsList = makeFakeCommentsList();

test('Renders reviews-component', () => {
  render(
    <Reviews
      setIsReviewModalActive={jest.fn}
      commentsList={mockCommentsList}
      setShownCommentsAmount={jest.fn()}
      shownCommentsAmount={3}
    />,
  );

  expect(screen.getAllByText(/Отзывы/i)).toBeTruthy();
  expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
