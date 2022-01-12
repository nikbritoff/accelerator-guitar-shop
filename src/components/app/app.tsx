import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import Catalog from '../../screens/catalog/catalog';
import NotFound from '../../screens/not-found/not-found';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Catalog}>
          <Catalog/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
