import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createApiURL } from '../../utils/api';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { fetcDataAction } from '../../store/api-actions';
import { History } from 'history';
import { CatalogSettings, GUITARS, queryParamName } from '../../const';
import { getAvailableStrings } from '../../utils/filter';
// import { GuitarFilterInfo } from '../../types/guitar-filter-info';

type FilterProps = {
  history: History;
}

function Filter({ history }: FilterProps): JSX.Element {
  const dispatch = useDispatch();
  const totalStrings = getAvailableStrings(GUITARS);

  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const queryMinPrice = queryString.parse(search)[queryParamName.MinPrice] ? String(queryString.parse(search)[queryParamName.MinPrice]) : '';
  const queryMaxPrice = queryString.parse(search)[queryParamName.MaxPrice] ? String(queryString.parse(search)[queryParamName.MaxPrice]) : '';
  const queryType = queryString.parse(search)[queryParamName.Type] ? String(queryString.parse(search)[queryParamName.Type]).split(',') : [];

  const [minPrice, setMinPrice] = useState(queryMinPrice);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice);
  const [guitarTypes, setSelectedTypes] = useState<string[]>(queryType);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableStrings, setAvailableStrings] = useState(totalStrings);


  const handleMinPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMinPrice(evt.target.value.trim());

    queryParams.delete(queryParamName.MinPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MinPrice, evt.target.value.trim());
    }
  };

  const handleMaxPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(evt.target.value.trim());

    queryParams.delete(queryParamName.MaxPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MaxPrice, evt.target.value.trim());
    }
  };


  const handleTypeInputChange = (type: string): void => {
    const index = guitarTypes.findIndex((selected) => selected === type);

    if (index === -1) {
      setSelectedTypes([...guitarTypes, type]);
    } else {
      setSelectedTypes([...guitarTypes.slice(0, index), ...guitarTypes.slice(index + 1)]);
    }

    queryParams.delete(queryParamName.Type);
    guitarTypes.forEach((currentType) => queryParams.append(queryParamName.Type, currentType));

    // if (guitarTypes.length === 0) {
    //   const strings = getAvailableStrings(GUITARS);
    //   setAvailableStrings([...strings]);
    // }
  };

  // useEffect(() => {
  //   if (guitarTypes.length > 0) {
  //     const strings = getAvailableStrings(guitarTypes);
  //     setAvailableStrings([...strings]);
  //   }}, [guitarTypes]);

  useEffect(() => {
    queryParams.delete(queryParamName.Type);
    guitarTypes.forEach((currentType) => queryParams.append(queryParamName.Type, currentType));
    history.replace({
      search: queryParams.toString(),
    });

    const page = queryString.parse(search).page;

    const url = createApiURL(queryParams.toString(), Number(page));
    dispatch(fetcDataAction(url));
  }, [dispatch, history, minPrice, maxPrice, queryParams, search, guitarTypes, availableStrings]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder="1 000"
              id="priceMin"
              name="от"
              value={minPrice}
              onInput={handleMinPriceInput}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder="30 000"
              id="priceMax"
              name="до"
              value={maxPrice}
              onInput={handleMaxPriceInput}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {GUITARS.map((guitar) => (
          <div
            key={guitar.type}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              className="visually-hidden"
              type="checkbox"
              id={guitar.type}
              name={guitar.type}
              onChange={(evt)=> handleTypeInputChange(guitar.type)}
              checked={guitarTypes.includes(guitar.type)}
            />
            <label
              htmlFor={guitar.type}
            >
              {guitar.name}
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {totalStrings.map((count) => (
          <div
            key={count}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${count}-strings`}
              name={`${count}-strings`}
              disabled={!availableStrings.includes(count)}
            />
            <label
              htmlFor={`${count}-strings`}
            >
              {count}
            </label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}

export default Filter;
