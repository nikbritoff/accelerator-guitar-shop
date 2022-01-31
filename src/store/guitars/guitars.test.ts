import { ActionType } from '../../types/action';
import { makeFakeGuitarsList } from '../../utils/mock';
import { guitars } from './guitars';

const mockGuitars = makeFakeGuitarsList();

describe('Reducer: guitars', () => {
  it('without additional parameters should return initial state',  () => {
    expect(guitars(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarsList: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsAmount: 0,
        searchResults: [],
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it('should update guitarsList by load guitarsList', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const loadGuitarsSuccess = {
      type: ActionType.LoadGuitarsSuccess,
      payload: mockGuitars,
    };

    expect(guitars(state, loadGuitarsSuccess))
      .toEqual({
        guitarsList: mockGuitars,
        guitarsLoading: false,
        guitarsError: false,
        guitarsAmount: 0,
        searchResults: [],
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it ('should update guitarsLoading to "true"', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const requestGuitars = {
      type: ActionType.RequestGuitars,
    };

    expect(guitars(state, requestGuitars))
      .toEqual({
        guitarsList: [],
        guitarsLoading: true,
        guitarsError: false,
        guitarsAmount: 0,
        searchResults: [],
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it ('should update guitarsError to "true"', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const loadGuitarsError = {
      type: ActionType.LoadGuitarsError,
    };

    expect(guitars(state, loadGuitarsError))
      .toEqual({
        guitarsList: [],
        guitarsLoading: false,
        guitarsError: true,
        guitarsAmount: 0,
        searchResults: [],
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it ('should update guitarsAmount by load', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const changeGuitarsAmount = {
      type: ActionType.ChangeGuitarsAmount,
      payload: 10,
    };

    expect(guitars(state, changeGuitarsAmount))
      .toEqual({
        guitarsList: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsAmount: 10,
        searchResults: [],
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it ('should update searchResults by load searchResults', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const loadSearchResultsSuccess = {
      type: ActionType.LoadSearchResultsSuccess,
      payload: mockGuitars,
    };

    expect(guitars(state, loadSearchResultsSuccess))
      .toEqual({
        guitarsList: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsAmount: 0,
        searchResults: mockGuitars,
        minPrice: 0,
        maxPrice: 100000,
      });
  });

  it ('should update minPrice and maxPrice by load', () => {
    const state = {
      guitarsList: [],
      guitarsLoading: false,
      guitarsError: false,
      guitarsAmount: 0,
      searchResults: [],
      minPrice: 0,
      maxPrice: 100000,
    };
    const LoadMinMaxPrices = {
      type: ActionType.LoadMinMaxPrices,
      payload: mockGuitars,
    };

    expect(guitars(state, LoadMinMaxPrices))
      .toEqual({
        guitarsList: [],
        guitarsLoading: false,
        guitarsError: false,
        guitarsAmount: 0,
        searchResults: [],
        minPrice: mockGuitars[0].price,
        maxPrice: mockGuitars[mockGuitars.length - 1].price,
      });
  });
});
