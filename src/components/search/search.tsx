import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getGuitarsList } from '../../store/guitars/selectors';
import styles from './search.module.css';
import cn from 'classnames';

function Search(): JSX.Element {
  const guitarsList = useSelector(getGuitarsList);

  const [focused, setFocused] = useState(false);
  const handleFocus = (): void => setFocused(true);
  const handleBlur = (): void => setFocused(false);

  const [value, setValue] = useState('');

  const filteredGuitars = value.length > 0 ? guitarsList.filter((guitar) => guitar.name.toLowerCase().includes( value.toLowerCase() )) : [];

  return (
    <div className="form-search">
      <form className="form-search__form">
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(evt) => {
            setValue(evt.target.value);
          }}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={cn(
        'form-search__select-list',
        styles['result-list'],
        {'hidden' : !focused},
      )}
      >
        {filteredGuitars.map((guitar) => (
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
