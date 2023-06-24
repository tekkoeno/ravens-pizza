import axios from 'axios';
import qs from 'qs';

import { setCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useRef } from 'react';

const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = useContext(SearchContext);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortType === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const fetchPizza = () => {
    const category = categoryId > 0 ? categoryId : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    setIsLoading(true);
    axios
      .get(
        `https://647ea71bc246f166da8f3c72.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setPizzaItems(res.data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (isMounted.current) {
      const sortTypeBy = sortType.replace('-', '');
      const queryString = qs.stringify({
        sortTypeBy,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizza = pizzaItems
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizza}</div>
      <Pagination onChangePage={(num) => onChangePage(num)} />
    </>
  );
};

export default Home;
