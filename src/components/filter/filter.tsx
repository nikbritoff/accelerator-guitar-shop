import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createApiURL } from '../../utils/api';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { fetcDataAction } from '../../store/api-actions';
import { History } from 'history';
import { queryParamName } from '../../const';

type FilterProps = {
  history: History;
}

function Filter({ history }: FilterProps): JSX.Element {
  const dispatch = useDispatch();

  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const queryMinPrice = queryString.parse(search).price_gte ? String(queryString.parse(search).price_gte) : '';
  const queryMaxPrice = queryString.parse(search).price_lte ? String(queryString.parse(search).price_lte) : '';

  const [minPrice, setMinPrice] = useState(queryMinPrice);
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice);

  const handleMinPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMinPrice(evt.target.value.trim());

    queryParams.delete(queryParamName.MinPrice);

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MinPrice, evt.target.value.trim());
    }
  };

  const handleMaxPriceInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(evt.target.value.trim());

    queryParams.delete(queryParamName.MaxPrice);

    if (evt.target.value.trim() !== '') {
      queryParams.set(queryParamName.MaxPrice, evt.target.value.trim());
    }
  };

  useEffect(() => {
    history.replace({
      search: queryParams.toString(),
    });

    const page = queryString.parse(search).page;

    const url = createApiURL(queryParams.toString(), Number(page));
    dispatch(fetcDataAction(url));
  }, [dispatch, history, minPrice, maxPrice, queryParams, search]);

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
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
