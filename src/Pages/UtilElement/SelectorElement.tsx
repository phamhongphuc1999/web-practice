import { Pagination } from '@mui/material';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import MultipleSelector from 'src/components/Selector/MultipleSelector';
import usePagination from 'src/hooks/usePagination';

const ItemList = Array(105)
  .fill(0)
  .map((_, index) => ({ id: `item${index + 1}`, label: `item${index + 1}` }));

export default function MultipleSelectorElement() {
  const { data, jump, maxPage, currentPage } = usePagination(ItemList);

  function onPageChange(page: number) {
    jump(page);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Utils', link: '/utils' }, { label: 'selector' }]} props={{ mb: 2 }} />
      <MultipleSelector
        items={data}
        Component={{
          start: (
            <Pagination
              page={currentPage}
              count={maxPage}
              showFirstButton
              showLastButton
              onChange={(_, page) => onPageChange(page)}
            />
          ),
        }}
      />
    </>
  );
}
