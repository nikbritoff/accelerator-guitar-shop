export enum AppRoute {
  Catalog = '/catalog',
  NotFoud = '/404',
}

export enum APIRoute {
  Guitars = '/guitars',
}

export const ratingValues = [
  1,
  2,
  3,
  4,
  5,
];

export enum Screen {
  Catalog  = 'Каталог',
  WhereBuy = 'Где купить?',
  About = 'О компании',
}

export const CATALOG_GUITARS_LIMIT = 9;

export enum SortingOrder {
  Increase = 'asc',
  Decrease = 'desc',
}

export enum SortingType {
  Price = 'price',
  Popular = 'rating',
}

export enum queryParamName {
  Name = 'name',
  NameLike = 'name_like',
  Page = 'page',
  Start = '_start',
  Limit = '_limit',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
  Sorting = '_sort',
  Order = '_order',
}
