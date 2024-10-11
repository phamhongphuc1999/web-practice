import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Box, Grid, GridProps, Tooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

function useStyle() {
  return {
    itemBox: {
      height: '100%',
      margin: '0rem 2rem',
      padding: '0.5rem',
      border: '1px solid',
      borderRadius: '10px',
    },
  };
}

interface ItemProps extends GridProps {
  label: string;
  detailLink?: string;
  Chart: ReactElement;
}

export function Item({ label, detailLink, Chart, ...props }: ItemProps) {
  const cls = useStyle();
  const { t } = useLocalTranslate();

  return (
    <Grid item sm={6} xs={12} {...props}>
      <Box sx={cls.itemBox}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
          {detailLink && (
            <Tooltip title={t('openDetail')}>
              <Link style={{ marginLeft: 1 }} to={detailLink}>
                <LaunchOutlinedIcon sx={{ fontSize: '16px' }} />
              </Link>
            </Tooltip>
          )}
        </Box>
        <Box mt={5} mb={2}>
          {Chart}
        </Box>
      </Box>
    </Grid>
  );
}
