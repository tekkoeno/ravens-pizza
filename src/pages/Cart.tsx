import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import closeSvg from '../assets/img/close.svg';
import { CartEmpty, CartItem } from '../components';
import CartSuccess from '../components/CartSuccess';
import { selectCart } from '../redux/slices/cart/selectors';
import { clearItem } from '../redux/slices/cart/slice';
import emptyCartImg from '../assets/img/empty-cart.png';
const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const [valueName, setValueName] = useState('');
  const [valueAdress, setValueAdress] = useState('');
  const [valuePhone, setValuePhone] = useState('');
  const [orderSend, setOrderSend] = useState(false);
  const [open, setOpen] = useState(false);
  const totalCount = items.reduce((obj, sum) => obj + sum.count, 0);
  const onClickClear = () => {
    if (window.confirm('Вы желаете очистить корзинку?')) {
      dispatch(clearItem());
    }
  };
  const onClickOpen = () => {
    setOrderSend(true);
    setOpen(false);
    dispatch(clearItem());
  };

  return (
    <>
      {open && (
        <div className="cart__popup">
          <div className="cart__popup-content">
            <img
              onClick={() => setOpen(false)}
              className="cart__popup-content--close"
              src={closeSvg}
              alt="close"
            />
            <div>
              <h2>Оформление заказа</h2>
              <h3>Ваш заказ:</h3>
              <ul className="cart__popup-list">
                {items.map((list, index) => {
                  return (
                    <li key={index}>
                      <img src={list.imageUrl} alt="" />
                      {list.name}
                      <p>{list.count} шт</p>
                      <p>{list.price * list.count} сом</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <form>
              <input
                onChange={(e) => setValueName(e.target.value)}
                value={valueName}
                type="text"
                placeholder="Ваше имя"
              />
              <input
                onChange={(e) => setValueAdress(e.target.value)}
                value={valueAdress}
                type="text"
                placeholder="Адрес доставки"
              />
              <input
                onChange={(e) => setValuePhone(e.target.value)}
                value={valuePhone}
                type="number"
                placeholder="Номер телефона"
              />
            </form>
            <p>
              Итого: <span className="cart__popup-total">395 cом</span>
            </p>
            <button
              className="cart__popup-btn button pay-btn"
              onClick={onClickOpen}
              disabled={!valueName || !valueAdress || !valuePhone}>
              <span>Заказать</span>
            </button>
          </div>
        </div>
      )}
      {(orderSend && (
        <CartEmpty
          img="https://free-png.ru/wp-content/uploads/2021/06/free-png.ru-39.png"
          value="Заказ успешно отправлен 😀"
          descr={`Уважаемый ${valueName}, заказ успешно выполнен, ваш заказ отправлен по адресу: ${valueAdress}`}
        />
      )) ||
        (!totalCount && (
          <CartEmpty
            img={emptyCartImg}
            value="Корзина пуста 🙁"
            descr={`Ваша корзина пустая, добавьте наши пиццы в корзины, закажите и все будет хорошо :)`}
          />
        )) ||
        (totalCount && (
          <div className="wrapper">
            <div className="content">
              <div className="container container--cart">
                <div className="cart">
                  <div className="cart__top">
                    <h2 className="content__title">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Корзина
                    </h2>
                    <div className="cart__clear" onClick={onClickClear}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 5H4.16667H17.5"
                          stroke="#B6B6B6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                          stroke="#B6B6B6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.33337 9.16667V14.1667"
                          stroke="#B6B6B6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.6666 9.16667V14.1667"
                          stroke="#B6B6B6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Очистить корзину</span>
                    </div>
                  </div>
                  <div className="content__items">
                    {items.map((item, index) => {
                      return <CartItem key={index} {...item} />;
                    })}
                  </div>
                  <div className="cart__bottom">
                    <div className="cart__bottom-details">
                      <span>
                        Всего пицц: <b>{totalCount} шт.</b>
                      </span>
                      <span>
                        Сумма заказа: <b>{totalPrice} сом</b>
                      </span>
                    </div>
                    <div className="cart__bottom-buttons">
                      <Link to="/" className="button button--outline button--add go-back-btn">
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7 13L1 6.93015L6.86175 1"
                            stroke="#D3D3D3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <span>Вернуться назад</span>
                      </Link>
                      <button className="button pay-btn" onClick={() => setOpen(true)}>
                        <span>Оплатить сейчас</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Cart;
