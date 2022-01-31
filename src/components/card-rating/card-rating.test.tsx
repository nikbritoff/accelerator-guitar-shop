import {render, screen} from '@testing-library/react';
import CardRating from './card-rating';

const RATING = 3;

test('Renders cardRating-component', () => {
  render(<CardRating rating={RATING}/>);
  const textElement = screen.getByText(/Рейтинг:/i);
  expect(textElement).toBeInTheDocument();
});
