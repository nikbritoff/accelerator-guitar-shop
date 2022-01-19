import queryString from 'query-string';
import { APIRoute, CATALOG_GUITARS_LIMIT } from '../const';

export const createApiURL = (currentParams: string, page = 1):string => {
  const queryParams = queryString.parse(currentParams);

  const guitarsRange = `?_start=${page * CATALOG_GUITARS_LIMIT - CATALOG_GUITARS_LIMIT}&_limit=${CATALOG_GUITARS_LIMIT}`;
  const name = queryParams.name ? `&name_like=${queryParams.name}` : '';

  const url = `${APIRoute.Guitars}${guitarsRange}${name}`;

  return url;
};
