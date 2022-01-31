import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createApiURL } from '../../utils/api';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { fetcDataAction } from '../../store/api-actions';
import { History } from 'history';
import { CatalogSettings, GUITARS, queryParamName } from '../../const';
import { getAvailableStrings } from '../../utils/filter';
import { GuitarFilterInfo } from '../../types/guitar-filter-info';
import { getMaxPrice, getMinPrice } from '../../store/guitars/selectors';

type FilterProps = {
  history: History;
}

function Filter({ history }: FilterProps): JSX.Element {
  const dispatch = useDispatch();
  const minListPrice = useSelector(getMinPrice);
  const maxListPrice = useSelector(getMaxPrice);
  const totalStrings = getAvailableStrings(GUITARS);

  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  // Парсинг url для получения значений параметров
  const queryMinPrice = queryString.parse(search)[queryParamName.MinPrice]
    ? String(queryString.parse(search)[queryParamName.MinPrice])
    : '';
  const queryMaxPrice = queryString.parse(search)[queryParamName.MaxPrice]
    ? String(queryString.parse(search)[queryParamName.MaxPrice])
    : '';
  const queryType = queryString.parse(search)[queryParamName.Type]
    ? String(queryString.parse(search)[queryParamName.Type]).split(',')
    : [];
  const queryStringCount = queryString.parse(search)[queryParamName.String]
    ? String(queryString.parse(search)[queryParamName.String]).split(',').map((value) => Number(value))
    : [];

  const [minPrice, setMinPrice] = useState(queryMinPrice);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(queryType);
  const [availableStrings, setAvailableStrings] = useState(totalStrings);
  const [selectedStrings, setSelectedStrings] = useState<number[]>(queryStringCount);


  const handleMinPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim();

    if (Number(value) < minListPrice && value.length > String(minListPrice).length) {
      setMinPrice(String(minListPrice));
    } else {
      setMinPrice(value);
    }

    queryParams.delete(queryParamName.MinPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MinPrice, evt.target.value.trim());
      return;
    }

    if (evt.target.value.trim() === '') {
      queryParams.delete(queryParamName.MinPrice);
    }
  };

  const handleMaxPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim();

    if (Number(value) > maxListPrice) {
      setMaxPrice(String(maxListPrice));
    } else {
      setMaxPrice(value);
    }

    queryParams.delete(queryParamName.MaxPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MaxPrice, evt.target.value.trim());
      return;
    }

    if (evt.target.value.trim() === '') {
      queryParams.delete(queryParamName.MaxPrice);
    }
  };

  const handleMinPriceBlur = (): void => {
    queryParams.delete(queryParamName.MinPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (minPrice === '') {
      return;
    }

    if (Number(minPrice) < minListPrice) {
      setMinPrice(String(minListPrice));
      queryParams.set(queryParamName.MinPrice, String(minListPrice));
      return;
    }

    if (Number(minPrice) > Number(maxPrice)) {
      setMinPrice(maxPrice);
      queryParams.set(queryParamName.MinPrice, maxPrice);
    }
  };

  const handleMaxPriceBlur = (): void => {
    queryParams.delete(queryParamName.MaxPrice);
    queryParams.set(queryParamName.Page, String(CatalogSettings.StartPage));

    if (maxPrice === '') {
      return;
    }

    if (Number(maxPrice) > maxListPrice) {
      setMaxPrice(String(maxListPrice));
      queryParams.set(queryParamName.MaxPrice, String(maxListPrice));
      return;
    }

    if (Number(maxPrice) < Number(minPrice)) {
      setMaxPrice(minPrice);
      queryParams.set(queryParamName.MaxPrice, minPrice);
    }
  };

  // Управление инпутов типа гитар
  const handleTypeInputChange = (type: string): void => {
    const index = selectedTypes.findIndex((selected) => selected === type);

    if (index === -1) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes([...selectedTypes.slice(0, index), ...selectedTypes.slice(index + 1)]);
    }

    queryParams.delete(queryParamName.Type);
    selectedTypes.forEach((currentType) => queryParams.append(queryParamName.Type, currentType));

    if (selectedTypes.length === 0) {
      const strings = getAvailableStrings(GUITARS);
      setAvailableStrings([...strings]);
    }

    setSelectedStrings(new Array(0));
  };

  // Управление инпутов количeства струн
  const handleStringsCountInputChange = (count: number): void => {
    const index = selectedStrings.findIndex((seleted) => seleted === count);

    if (index === -1) {
      setSelectedStrings([...selectedStrings, count]);
    } else {
      setSelectedStrings([...selectedStrings.slice(0, index), ...selectedStrings.slice(index +1)]);
    }

    queryParams.delete(queryParamName.String);
    selectedStrings.forEach((currentCount) => queryParams.append(queryParamName.String, String(currentCount) ));
  };


  // Отключение недоступного количества струн
  useEffect(() => {
    if (selectedTypes.length > 0) {
      const selectedInfo: GuitarFilterInfo[] = [];

      GUITARS.forEach((element) => {
        if (selectedTypes.includes(element.type)) {
          selectedInfo.push(element);
        }
      });

      const strings = getAvailableStrings(selectedInfo);
      setAvailableStrings([...strings]);
    } else {
      const strings = getAvailableStrings(GUITARS);
      setAvailableStrings([...strings]);
    }
  }, [selectedTypes]);

  useEffect(() => {
    // 1. Параметры типов гитар
    queryParams.delete(queryParamName.Type);
    selectedTypes.forEach((currentType) => queryParams.append(queryParamName.Type, currentType));

    // 2. Параметры количества струн
    queryParams.delete(queryParamName.String);
    selectedStrings.forEach((currentCount) => queryParams.append(queryParamName.String, String(currentCount) ));

    history.replace({
      search: queryParams.toString(),
    });

    queryParams.set(queryParamName.Page, String(1));
    const page = queryString.parse(search).page;

    const url = createApiURL(queryParams.toString(), Number(page));
    dispatch(fetcDataAction(url));
  }, [dispatch, history, minPrice, maxPrice, queryParams, search, selectedTypes, availableStrings, selectedStrings]);

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
              placeholder={String(minListPrice)}
              id="priceMin"
              name="от"
              min={0}
              value={minPrice}
              onInput={handleMinPriceInput}
              onBlur={handleMinPriceBlur}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={String(maxListPrice)}
              id="priceMax"
              name="до"
              min={0}
              value={maxPrice}
              onInput={handleMaxPriceInput}
              onBlur={handleMaxPriceBlur}
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
              onChange={()=> handleTypeInputChange(guitar.type)}
              checked={selectedTypes.includes(guitar.type)}
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
              onChange={() => handleStringsCountInputChange(count)}
              checked={selectedStrings.includes(count)}
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
