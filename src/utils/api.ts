import queryString from 'query-string';
import { APIRoute, CATALOG_GUITARS_LIMIT, queryParamName } from '../const';

export const createApiURL = (currentParams: string, page = 1):string => {
  const queryParams = queryString.parse(currentParams);

  const guitarsRange = `?${queryParamName.Start}=${page * CATALOG_GUITARS_LIMIT - CATALOG_GUITARS_LIMIT}&${queryParamName.Limit}=${CATALOG_GUITARS_LIMIT}`;
  const name = queryParams.name ? `&${queryParamName.NameLike}=${queryParams.name}` : '';
  const minPrice = queryParams[queryParamName.MinPrice] = queryParams.price_gte ? `&${queryParamName.MinPrice}=${queryParams.price_gte}` : '';
  const maxPrice = queryParams[queryParamName.MaxPrice] = queryParams.price_lte ? `&${queryParamName.MaxPrice}=${queryParams.price_lte}` : '';
  const sortingType = queryParams[queryParamName.Sorting] = queryParams[queryParamName.Sorting] ? `&${queryParamName.Sorting}=${queryParams[queryParamName.Sorting]}` : '';
  const sortingOrder = queryParams[queryParamName.Order] = queryParams[queryParamName.Order] ? `&${queryParamName.Order}=${queryParams[queryParamName.Order]}` : '';

  const url = `${APIRoute.Guitars}${guitarsRange}${name}${minPrice}${maxPrice}${sortingType}${sortingOrder}`;

  return url;
};
