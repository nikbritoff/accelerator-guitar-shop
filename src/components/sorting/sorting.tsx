import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { queryParamName, SortingOrder, SortingType } from '../../const';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { History } from 'history';
import { createApiURL } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { fetcDataAction } from '../../store/api-actions';

type SortingProps = {
  history: History,
}

function Sorting({history}: SortingProps): JSX.Element {
  const dispatch = useDispatch();

  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const sortingTypeQuery = queryString.parse(search)[queryParamName.Sorting] ? String(queryString.parse(search)[queryParamName.Sorting]) : null;
  const sortingOrderQuery = queryString.parse(search)[queryParamName.Order] ? String(queryString.parse(search)[queryParamName.Order]) : null;


  const [sortingType, setSortingType] = useState(sortingTypeQuery);
  const [sortingOrder, setSortingOrder] = useState(sortingOrderQuery);

  const handleSortingTypeButtonClick = (type: SortingType): void => {
    setSortingType(type);
    queryParams.set(queryParamName.Sorting, type);

    if (sortingOrder === null) {
      setSortingOrder(type);
      queryParams.set(queryParamName.Order, SortingOrder.Increase);
    }
  };

  const handleSortingOrderButtonCLick = (order: SortingOrder): void => {
    setSortingOrder(order);
    queryParams.set(queryParamName.Order, order);

    if (sortingType === null) {
      setSortingType(SortingType.Price);
      queryParams.set(queryParamName.Sorting, SortingType.Price);
    }
  };

  useEffect(() => {
    history.replace({
      search: queryParams.toString(),
    });

    const url = createApiURL(queryParams.toString());
    dispatch(fetcDataAction(url));
  }, [dispatch, history, queryParams, sortingType, sortingOrder]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={cn(
            'catalog-sort__type-button',
            {'catalog-sort__type-button--active' : sortingType === SortingType.Price},
          )}
          aria-label="по цене"
          tabIndex={sortingType === SortingType.Price ? -1 : 0}
          onClick={() => handleSortingTypeButtonClick(SortingType.Price)}
        >
          по цене
        </button>
        <button
          className={cn(
            'catalog-sort__type-button',
            {'catalog-sort__type-button--active' : sortingType === SortingType.Popular},
          )}
          aria-label="по популярности"
          tabIndex={sortingType === SortingType.Popular ? -1 : 0}
          onClick={() => handleSortingTypeButtonClick(SortingType.Popular)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={cn(
            'catalog-sort__order-button',
            'catalog-sort__order-button--up',
            {'catalog-sort__order-button--active' : sortingOrder === SortingOrder.Increase},
          )}
          aria-label="По возрастанию"
          tabIndex={sortingOrder === SortingOrder.Increase ? -1 : 0}
          onClick={() => handleSortingOrderButtonCLick(SortingOrder.Increase)}
        >
        </button>
        <button
          className={cn(
            'catalog-sort__order-button',
            'catalog-sort__order-button--down',
            {'catalog-sort__order-button--active' : sortingOrder === SortingOrder.Decrease},
          )}
          aria-label="По убыванию"
          tabIndex={sortingOrder === SortingOrder.Decrease ? -1 : 0}
          onClick={() => handleSortingOrderButtonCLick(SortingOrder.Decrease)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
