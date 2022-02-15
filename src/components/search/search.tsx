import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/guitars/selectors';
import styles from './search.module.css';
import cn from 'classnames';
import { fetchSearchResults } from '../../store/api-actions';
import { History } from 'history';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

type SearchProps = {
  history: History,
}

type KeyboardEvent = {
  key: string,
};

function Search({history}: SearchProps): JSX.Element {
  const dispatch = useDispatch();
  const searchResults = useSelector(getSearchResults);

  const [focused, setFocused] = useState(false);
  const handleFocus = (): void => setFocused(true);
  const handleBlur = (): void => setFocused(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    handleFocus();
    setValue(evt.target.value);

    if (evt.target.value === '') {
      setFocused(false);
    }
  };

  const { search } = useLocation();
  const name  = queryString.parse(search).name ? String(queryString.parse(search).name) : '';
  const [value, setValue] = useState(name);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
  };

  useEffect(() => {
    if (value !== '') {
      dispatch(fetchSearchResults(value));
    }
  }, [dispatch, value]);

  return (
    <div className="form-search"
      onMouseLeave={handleBlur}
    >
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
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul
        className={cn(
          'form-search__select-list',
          styles['result-list'],
          {'hidden' : !focused},
          {'hidden' : searchResults.length < 1},
        )}
      >
        {searchResults.map((guitar, index) => (
          <li
            key={guitar.name}
            className="form-search__select-item"
            tabIndex={0}
            onBlur={() => {
              if (index === searchResults.length - 1) {
                handleBlur();
              }
            }}
            onClick={() => {
              history.push(`/catalog/${guitar.id}`);
            }}
            onKeyDown={(evt: KeyboardEvent) => {
              if (evt.key === 'Enter') {
                history.push(`/catalog/${guitar.id}`);
              }
            }}
          >
            {guitar.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
