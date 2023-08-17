import React from 'react';
import axios from 'axios';
import s from './FullPizza.module.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string, 
    name: string, 
    descr: string, 
    price: number
  }>();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://647ea71bc246f166da8f3c72.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Не удалось получить пиццы. Повторите попытку позже!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className={s.content}>
      <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.name}</h2>
      <p>{pizza.descr}</p>
      <h4>{pizza.price} ₽</h4>
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
      </div>
      
    </div>
  );
};

export default FullPizza;
