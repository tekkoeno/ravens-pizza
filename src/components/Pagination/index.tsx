import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';
type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(num) => onChangePage(num.selected + 1)}
      pageRangeDisplayed={8}
      forcePage={currentPage - 1}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
