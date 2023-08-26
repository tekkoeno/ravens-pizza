import { Link } from 'react-router-dom';

const CartEmpty = ({ value, descr, img }) => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>{value}</h2>
          <p>{descr}</p>
          <img src={img} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
