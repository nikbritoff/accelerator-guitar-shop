import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, Screen } from '../../const';
import { getCurrentScreen } from '../../store/app-state/selectors';
import Search from '../search/search';
import cn from 'classnames';
import { changeScreen } from '../../store/action';
import { History } from 'history';

type HeaderProps = {
  history: History,
}

function Header({history} : HeaderProps): JSX.Element {
  const dispatch = useDispatch();
  const currentScreen = useSelector(getCurrentScreen);

  const handleLinkClick = (screen: Screen) => {
    dispatch(changeScreen(screen));
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="/">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={cn(
                  'link main-nav__link',
                  {'link--current' : currentScreen === Screen.Catalog},
                )}
                to={AppRoute.Catalog}
                onClick={() => handleLinkClick(Screen.Catalog)}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  'link main-nav__link',
                  {'link--current' : currentScreen === Screen.WhereBuy},
                )}
                to={AppRoute.NotFoud}
                onClick={() => handleLinkClick(Screen.WhereBuy)}
              >
                Где купить?
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  'link main-nav__link',
                  {'link--current' : currentScreen === Screen.About},
                )}
                to={AppRoute.NotFoud}
                onClick={() => handleLinkClick(Screen.About)}
              >
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <Search history={history}/>
        <Link className="header__cart-link" to={AppRoute.NotFoud} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
