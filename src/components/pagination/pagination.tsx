import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import { getGuitarsAmount } from '../../store/guitars/selectors';
import { getPagesAmount, getPagesList } from '../../utils/pagination';

type PaginationProps = {
  currentPage: number,
};

function Pagination({currentPage}: PaginationProps): JSX.Element {
  const guitarsAmount = useSelector(getGuitarsAmount);

  const pagesCount = getPagesAmount(guitarsAmount);
  const pagesList = getPagesList(pagesCount);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > 1 &&
          <li className="pagination__page pagination__page--prev" id="next">
            <Link className="link pagination__page-link" to={`${AppRoute.Catalog}?page=${currentPage - 1}`}>Назад</Link>
          </li>}
        {pagesList.map((page) => (
          <li
            key={page}
            className={cn(
              'pagination__page',
              {'pagination__page--active' : page === currentPage},
            )}
          >
            <Link className="link pagination__page-link" to={`${AppRoute.Catalog}?page=${page}`}>{page}</Link>
          </li>
        ))}
        {currentPage !== pagesList.length &&
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to={`${AppRoute.Catalog}?page=${currentPage + 1}`}>Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
