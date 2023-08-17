import s from './NotFoundBlock.module.scss';
const NotFoundBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>☹️</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={s.descr}>
        К сожалению, произошла какая-то ошибка, возможно вы ввели неправильный адрес, вам следует
        перепроверить вашу адресную строку!
      </p>
    </div>
  );
};

export default NotFoundBlock;
