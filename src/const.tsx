export enum AppRoute {
  Catalog = '/catalog',
  Guitar = '/catalog/:id',
  NotFoud = '/404',
}

export const COUNT_TOKEN_NAME = 'x-total-count';

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
  Main = '/',
  Catalog  = 'Каталог',
  WhereBuy = 'Где купить?',
  About = 'О компании',
  Other = 'other',
}

export const CATALOG_GUITARS_LIMIT = 9;
export const START_CATALOG_PAGE = 1;

export enum CatalogSettings {
  GuitarsLimit = 9,
  StartPage = 1,
}

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
  Type = 'type',
  String = 'stringCount',
  Sorting = '_sort',
  Order = '_order',
}


export const GUITARS = [
  {
    name: 'Акустические гитары',
    type: 'acoustic',
    strings: [6, 7, 12],
  },
  {
    name: 'Электрогитары',
    type: 'electric',
    strings: [4, 6, 7],
  },
  {
    name: 'Укулеле',
    type: 'ukulele',
    strings: [4],
  },
];
