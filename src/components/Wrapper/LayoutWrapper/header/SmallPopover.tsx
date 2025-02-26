import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Box, Collapse, Popover, PopoverProps, Typography, useTheme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppReferenceConfig } from 'src/configs/layout';
import { AppReferenceId } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { HeaderBox } from './HeaderDetailItem';

interface Props extends PopoverProps {
  referenceId: AppReferenceId;
  setReferenceId: (referenceId: AppReferenceId) => void;
  setEl: Dispatch<SetStateAction<SVGSVGElement | null>>;
}

export default function SmallPopover({ referenceId, setReferenceId, setEl, ...props }: Props) {
  const { t } = useLocalTranslate();
  const theme = useTheme();
  const isLight = theme.palette.mode == 'light';
  const navigate = useNavigate();

  function onBigLinkClick(id: AppReferenceId, link: string | undefined) {
    setReferenceId(id);
    if (link) {
      navigate(link);
      setEl(null);
    }
  }

  return (
    <>
      {props.open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 1200,
          }}
          onClick={(event) => {
            if (props.onClose) props.onClose(event, 'backdropClick');
          }}
        />
      )}
      <Popover
        {...props}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        slotProps={{ paper: { sx: { borderRadius: '24px', width: '100%', marginTop: '85px' } } }}
      >
        <Box sx={{ boxShadow: '0px 4px 16px 0px #D7D8E380', padding: '0.75rem' }}>
          {Object.values(AppReferenceConfig).map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: isLight ? '#F8F9FB' : 'rgba(63, 63, 63, 0.56)',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginTop: '1rem',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => onBigLinkClick(item.id, item.link)}
                >
                  <Typography className="font-[500]">{t(item.title)}</Typography>
                  {item.items && (
                    <ArrowForwardIosOutlinedIcon
                      className="text-[14px] text-[#A7B3CF] transition-all"
                      sx={[referenceId == item.id && { transform: 'rotate(90deg)' }]}
                    />
                  )}
                </Box>
                {item.items && (
                  <Collapse in={referenceId == item.id}>
                    <HeaderBox
                      config={item.items}
                      onLinkClick={() => setEl(null)}
                      sx={{ paddingTop: '2rem' }}
                    />
                  </Collapse>
                )}
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
