import qs from 'qs';

import { useSelector } from 'react-redux';

import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import SortPopup, { sortList } from '../components/Sort';

import { Categories, Pagination, Skeleton, PizzaBlock } from '../components';
import { useRef } from 'react';

import { useAppDispatch } from '../redux/store';
import { filterSortProperty, filterState } from '../redux/slices/filter/selectors';
import { setCategory, setCurrentPage, setFilters, setSort } from '../redux/slices/filter/slice';

import { fetchPizza } from '../redux/slices/pizza/slice';
import { SearchPizzaParams } from '../redux/slices/pizza/type';
import { selectPizzaData } from '../redux/slices/pizza/selector';
import { Sort } from '../redux/slices/filter/type';

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categoryId, currentPage, searchValue, sort } = useSelector(filterState);
  const sortType = useSelector(filterSortProperty);
  const { pizzaItems, status } = useSelector(selectPizzaData);
  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };
  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategory(id))
  }, [])
  const onChangeSort = (obj: Sort) => {
    dispatch(setSort(obj))
  }

  const getPizzas = async () => {
    const category = categoryId ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `search=${searchValue}` : '';
    dispatch(
      fetchPizza({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  };
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          sort: sort || sortList[0],
          currentPage: Number(params.currentPage),
        }),
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    if (isMounted.current) {
      const sortBy = sortType.replace('-', '');
      const queryString = qs.stringify({
        categoryId,
        sortBy,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizza = pizzaItems
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)}/>
        <SortPopup value={sort} onChangeSort={(obj) => onChangeSort(obj)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось отобразить пиццы. Повторите попытку позже</p>
        </div>
      ) : (
        ''
      )}
      <div className="content__items">{status === 'loading' ? skeleton : pizza}</div>
      {status === 'error' ? (
        ''
      ) : (
        <Pagination currentPage={currentPage} onChangePage={(num: number) => onChangePage(num)} />
      )}
    </>
  );
};

export default Home;
