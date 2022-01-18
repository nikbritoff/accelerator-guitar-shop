import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/guitars/selectors';
import styles from './search.module.css';
import cn from 'classnames';
import { fetchSearchResults } from '../../store/api-actions';
// import { loadGuitarsSuccess, changeGuitarsAmount } from '../../store/action';

function Search(): JSX.Element {
  const dispatch = useDispatch();
  const searchResults = useSelector(getSearchResults);

  const [focused, setFocused] = useState(false);
  const handleFocus = (): void => setFocused(true);
  const handleBlur = (): void => setFocused(false);

  const [value, setValue] = useState('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    // dispatch(loadGuitarsSuccess(searchResults));
    // dispatch(changeGuitarsAmount(searchResults.length));
  };

  useEffect(() => {
    dispatch(fetchSearchResults(value));
  }, [dispatch, value]);

  return (
    <div className="form-search">
      <form
        className="form-search__form"
        onSubmit={handleFormSubmit}
      >
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={cn(
        'form-search__select-list',
        styles['result-list'],
        {'hidden' : !focused},
      )}
      >
        {searchResults.map((guitar) => (
          <li
            key={guitar.name}
            className="form-search__select-item"
            tabIndex={0}
          >
            {guitar.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
