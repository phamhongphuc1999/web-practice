import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import useTranslate from 'src/hooks/useTranslate';

interface DataType {
  name: string;
  type: string;
  example?: string;
}

export interface PropertiesListProps {
  data?: Array<DataType>;
}

export default function PropertiesList({ data }: PropertiesListProps) {
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);

  return data ? (
    <Box>
      <Box sx={{ cursor: 'pointer' }} display="flex" alignItems="center" onClick={() => setOpen(!open)}>
        <Typography>{t('properties')}</Typography>
        <IconButton>
          <ArrowAnimationIcon isTransform={open} />
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box>
          {data.map((item, index) => {
            let _text = '';
            if (item.example)
              _text = `${t('name')}: ${item.name}, ${t('type')}: ${item.type}, ${t('example')}: ${item.example}`;
            else _text = `${t('name')}: ${item.name}, ${t('type')}: ${item.type}`;

            return (
              <Box key={index}>
                <Typography color="secondary" sx={{ fontSize: '12px' }}>
                  {_text}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  ) : (
    <></>
  );
}
