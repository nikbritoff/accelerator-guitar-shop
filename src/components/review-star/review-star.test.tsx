import { render, screen } from '@testing-library/react';
import ReviewStar from './review-star';

const mockProps = {
  title: 'Ужасно',
  id: 1,
  name: 'rate',
  isNewCommentPosting: false,
  isChecked: true,
  handleChange: jest.fn,
};

test('Renders review-star-component', () => {
  render(
    <ReviewStar
      title={mockProps.title}
      id={mockProps.id}
      name={mockProps.name}
      isNewCommentPosting={mockProps.isNewCommentPosting}
      isChecked={mockProps.isChecked}
      handleChange={mockProps.handleChange}
    />,
  );

  expect(screen.getByTitle(mockProps.title)).toBeInTheDocument();
});
