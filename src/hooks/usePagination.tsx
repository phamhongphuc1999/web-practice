import { useState } from 'react';

interface ConfigType {
  pageIndex?: number;
  rowPerPage?: number;
}

export default function usePagination<DataType>(data: Array<DataType>, defaultData?: ConfigType) {
  const pageIndex = defaultData?.pageIndex ?? 1;
  const rowPerPage = defaultData?.rowPerPage ?? 10;

  const [currentPage, setCurrentPage] = useState(pageIndex);
  const maxPage = Math.ceil(data.length / rowPerPage);

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return {
    next,
    prev,
    jump,
    data: data.slice(currentPage * rowPerPage - rowPerPage, currentPage * rowPerPage),
    currentPage,
    maxPage,
  };
}
