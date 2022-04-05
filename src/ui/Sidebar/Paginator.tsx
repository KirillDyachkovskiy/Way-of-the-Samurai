import Field from '../Field';
import s from './sidebar.module.scss';

interface IPaginator {
  items: Array<number>;
  currentPage: number;
  changePage: (page: number, pageSize: number) => void;
  pageSize: number;
}

export default function Paginator({
  items, currentPage, changePage, pageSize,
}: IPaginator) {
  return (
    <Field>
      <aside className={s.sidebar}>
        {items.map((page: number) => (
          <span
            role="option"
            key={page}
            className={`${s.sidebar__item} ${page === currentPage ? s.sidebar__item_active : ''}`}
            onClick={() => changePage(page, pageSize)}
          >
            {page}
          </span>
        ))}
      </aside>
    </Field>
  );
}