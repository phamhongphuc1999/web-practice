import { Box, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import MultipleSelector from 'src/components/Selector/MultipleSelector';
import { ROUTE } from 'src/configs/constance';
import { CHAINS } from 'src/configs/networkConfig';
import usePagination from 'src/hooks/usePagination';

interface ExtendItem extends CssSelectItem {
  chainId: string;
}

const ItemList = Array(105)
  .fill(0)
  .map((_, index) => ({ id: `item${index + 1}`, label: `item${index + 1}` }));

export default function MultipleSelectorElement() {
  const { data, jump, maxPage, currentPage } = usePagination(ItemList);
  function onPageChange(page: number) {
    jump(page);
  }

  const NetworkList = Object.entries(CHAINS).map((element, _) => ({
    id: element[0].toString(),
    chainId: element[0],
    label: element[1].name,
  }));
  const [network, setNetwork] = useState(NetworkList[0]);
  function onChooseItem(_: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ExtendItem) {
    setNetwork(item);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Utils', link: ROUTE.UTILS }, { label: 'selector' }]} props={{ mb: 2 }} />
      <Box>
        <Typography sx={{ marginBottom: 1 }}>Multiple selector</Typography>
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
      </Box>
      <Box mt={2}>
        <Typography sx={{ marginBottom: 1 }}>Css selector</Typography>
        <CssSelector<ExtendItem> items={NetworkList} value={network.label} events={{ onChooseItem: onChooseItem }} />
      </Box>
    </>
  );
}
