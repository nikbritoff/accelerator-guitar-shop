import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import Catalog from '../../screens/catalog/catalog';
import Guitar from '../../screens/guitar/guitar';
import NotFound from '../../screens/not-found/not-found';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route
          exact
          path={AppRoute.Catalog}
          render={() => <Catalog history={browserHistory}/>}
        >
        </Route>
        <Route exact path={AppRoute.Guitar}>
          <Guitar history={browserHistory}/>
        </Route>
        <Route>
          <NotFound history={browserHistory}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
