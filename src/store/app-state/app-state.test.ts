import { Screen } from '../../const';
import { appState } from './app-state';

describe('Reducer: appState', () => {
  it('without additional parameters should return initial state',  () => {
    expect(appState(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentScreen: Screen.Main,
      });
  });
});
