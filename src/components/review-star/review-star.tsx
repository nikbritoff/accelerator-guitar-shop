import { ChangeEvent } from 'react';

type ReviewStarProps = {
  title: string,
  id: number,
  name: string,
  isNewCommentPosting: boolean,
  isChecked: boolean,
  handleChange: ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

function ReviewStar({title, id, name, isNewCommentPosting, isChecked, handleChange}: ReviewStarProps): JSX.Element {
  return (
    <>
      <input
        className="visually-hidden"
        type="radio"
        checked={isChecked}
        id={`star-${id}`}
        name={name}
        value={id}
        onChange={handleChange}
        disabled={isNewCommentPosting}
      />
      <label
        className="rate__label"
        htmlFor={`star-${id}`}
        title={title}
      >
      </label>
    </>
  );
}

export default ReviewStar;
