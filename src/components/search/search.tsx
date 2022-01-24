import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults } from '../../store/guitars/selectors';
import styles from './search.module.css';
import cn from 'classnames';
import { fetcDataAction, fetchSearchResults } from '../../store/api-actions';
import { History } from 'history';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { createApiURL } from '../../utils/api';
import { queryParamName } from '../../const';

type SearchProps = {
  history: History,
}

function Search({history}: SearchProps): JSX.Element {
  const dispatch = useDispatch();
  const searchResults = useSelector(getSearchResults);

  const [focused, setFocused] = useState(false);
  const handleFocus = (): void => setFocused(true);
  const handleBlur = (): void => setFocused(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value.trim());
  };

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const name  = queryString.parse(search).name ? String(queryString.parse(search).name) : '';
  const [value, setValue] = useState(name);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    queryParams.delete(queryParamName.Name);
    queryParams.set(queryParamName.Page, String(1));

    if (value === '') {
      queryParams.delete(queryParamName.Name);
    } else {
      queryParams.set(queryParamName.Name, value);
    }

    history.replace({
      search: queryParams.toString(),
    });

    const url = createApiURL(queryParams.toString(), 1);
    dispatch(fetcDataAction(url));
  };

  useEffect(() => {
    dispatch(fetchSearchResults(value));
  }, [dispatch, value]);

  return (
    <div className="form-search"
      onFocus={handleFocus}
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
          onFocus={handleFocus}
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
            onMouseOver={handleFocus}
            onBlur={handleBlur}
            onClick={() => {
              setValue(guitar.name);
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
