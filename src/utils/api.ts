import queryString from 'query-string';
import { APIRoute, CatalogSettings, queryParamName } from '../const';

export const createApiURL = (currentParams: string, page = CatalogSettings.StartPage):string => {
  const queryParams = queryString.parse(currentParams);

  const guitarsRange = `?${queryParamName.Start}=${page * CatalogSettings.GuitarsLimit - CatalogSettings.GuitarsLimit}&${queryParamName.Limit}=${CatalogSettings.GuitarsLimit}`;
  const name = queryParams.name ? `&${queryParamName.NameLike}=${queryParams.name}` : '';
  const minPrice = queryParams[queryParamName.MinPrice] = queryParams.price_gte ? `&${queryParamName.MinPrice}=${queryParams.price_gte}` : '';
  const maxPrice = queryParams[queryParamName.MaxPrice] = queryParams.price_lte ? `&${queryParamName.MaxPrice}=${queryParams.price_lte}` : '';
  const sortingType = queryParams[queryParamName.Sorting] = queryParams[queryParamName.Sorting] ? `&${queryParamName.Sorting}=${queryParams[queryParamName.Sorting]}` : '';
  const sortingOrder = queryParams[queryParamName.Order] = queryParams[queryParamName.Order] ? `&${queryParamName.Order}=${queryParams[queryParamName.Order]}` : '';
  const guitarSelectedType = queryParams[queryParamName.Type]
    ? `&${queryParamName.Type}=${queryParams[queryParamName.Type]?.toString().split(',').join(`&${queryParamName.Type}=`)}` : '';

  const url = `${APIRoute.Guitars}${guitarsRange}${name}${minPrice}${maxPrice}${sortingType}${sortingOrder}${guitarSelectedType}`;

  return url;
};
