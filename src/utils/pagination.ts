import { CatalogSettings } from '../const';

export const getPagesAmount = (guitarsAmount: number): number =>
  Math.ceil(guitarsAmount / CatalogSettings.GuitarsLimit);

export const getPagesList = (pagesAmount: number): number[] =>
  new Array(pagesAmount).fill(0).map((page: number, index) => page = index + 1);
