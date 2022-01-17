import { CATALOG_GUITARS_LIMIT } from '../const';

export const getPagesAmount = (guitarsAmount: number): number =>
  Math.ceil(guitarsAmount / CATALOG_GUITARS_LIMIT);

export const getPagesList = (pagesAmount: number): number[] =>
  new Array(pagesAmount).fill(0).map((page: number, index) => page = index + 1);
