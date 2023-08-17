import React from 'react';
import img from '../assets/img/success.svg';
import { Link } from 'react-router-dom';

const CartSuccess = ({ name, adress }) => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Заказ успешно выполнен! <span>😀</span>
          </h2>
          <p>
            Уважаемый {name}, мы мы приняли заказ и уже отправили курьера для доставки!
            <br />
            Ваш заказ по адресу: {adress}
          </p>
          <img src={img} alt="Success cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSuccess;
