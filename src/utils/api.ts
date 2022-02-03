import queryString from 'query-string';
import { APIRoute, CatalogSettings, queryParamName, SortingOrder, SortingType } from '../const';

export const createApiURL = (currentParams: string, page = CatalogSettings.StartPage):string => {
  const queryParams = queryString.parse(currentParams);

  const guitarsRange = `?${queryParamName.Start}=${page * CatalogSettings.GuitarsLimit - CatalogSettings.GuitarsLimit}&${queryParamName.Limit}=${CatalogSettings.GuitarsLimit}`;
  const name = queryParams.name ? `&${queryParamName.NameLike}=${queryParams.name}` : '';
  const minPrice = queryParams[queryParamName.MinPrice] = queryParams.price_gte ? `&${queryParamName.MinPrice}=${queryParams.price_gte}` : '';
  const maxPrice = queryParams[queryParamName.MaxPrice] = queryParams.price_lte ? `&${queryParamName.MaxPrice}=${queryParams.price_lte}` : '';
  const sortingType = queryParams[queryParamName.Sorting] = queryParams[queryParamName.Sorting] ? `&${queryParamName.Sorting}=${queryParams[queryParamName.Sorting]}` : '';
  const sortingOrder = queryParams[queryParamName.Order] = queryParams[queryParamName.Order] ? `&${queryParamName.Order}=${queryParams[queryParamName.Order]}` : '';
  const guitarSelectedType = queryParams[queryParamName.Type]
    ? `&${queryParamName.Type}=${queryParams[queryParamName.Type]?.toString().split(',').join(`&${queryParamName.Type}=`)}`
    : '';

  const guitarSelectedStringCount = queryParams[queryParamName.String]
    ? `&${queryParamName.String}=${queryParams[queryParamName.String]?.toString().split(',').join(`&${queryParamName.String}=`)}`
    : '';

  const url = `${APIRoute.Guitars}${guitarsRange}${name}${minPrice}${maxPrice}${sortingType}${sortingOrder}${guitarSelectedType}${guitarSelectedStringCount}`;

  return url;
};

export const createApiURLForMinMaxPrices = (currentParams: string):string => {
  const queryParams = queryString.parse(currentParams);

  const sortingType = `?${queryParamName.Sorting}=${SortingType.Price}`;
  const sortingOrder =`&${queryParamName.Order}=${SortingOrder.Increase}`;
  const guitarSelectedType = queryParams[queryParamName.Type]
    ? `&${queryParamName.Type}=${queryParams[queryParamName.Type]?.toString().split(',').join(`&${queryParamName.Type}=`)}`
    : '';

  const guitarSelectedStringCount = queryParams[queryParamName.String]
    ? `&${queryParamName.String}=${queryParams[queryParamName.String]?.toString().split(',').join(`&${queryParamName.String}=`)}`
    : '';

  const url = `${APIRoute.Guitars}${sortingType}${sortingOrder}${guitarSelectedType}${guitarSelectedStringCount}`;

  return url;
};
