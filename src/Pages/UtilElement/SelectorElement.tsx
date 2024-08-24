import { Box, Pagination, Typography } from '@mui/material';
import { usePagination } from '@peter-present/react-hook-utils';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssSelector, { CssSelectItem } from 'src/components/Selector/CssSelector';
import MultipleSelector from 'src/components/Selector/MultipleSelector';
import { ROUTE } from 'src/configs/constance';
import { CHAINS } from 'src/configs/networkConfig';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface ExtendItem extends CssSelectItem {
  chainId: string;
}

export default function MultipleSelectorElement() {
  const { t } = useLocalTranslate();

  const ItemList = Array(105)
    .fill(0)
    .map((_, index) => ({
      id: `item${index + 1}`,
      label: `${t('thItem', { item: (index + 1).toString() })}`,
    }));

  const { data, jump, maxPage, currentPage } = usePagination(ItemList);
  function onPageChange(page: number) {
    jump(page);
  }

  const NetworkList = Object.entries(CHAINS).map((element, _) => ({
    id: element[0].toString(),
    chainId: element[0],
    label: element[1].isMainnet
      ? `${t('mainnet', { network: element[1].translate })}`
      : `${t('testnet', { network: element[1].translate })}`,
  }));
  const [network, setNetwork] = useState(NetworkList[0]);
  function onChooseItem(_: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ExtendItem) {
    setNetwork(item);
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[{ label: t('utils'), link: ROUTE.UTILS }, { label: t('multipleSelector') }]}
        mb={2}
      />
      <Box>
        <Typography sx={{ marginBottom: 1 }}>{t('multipleSelector')}</Typography>
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
        <Typography sx={{ marginBottom: 1 }}>{t('cssSelector')}</Typography>
        <CssSelector<ExtendItem>
          items={NetworkList}
          value={network.label}
          events={{ onChooseItem: onChooseItem }}
        />
      </Box>
    </>
  );
}
