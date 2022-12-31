import { Box, IconButton, IconButtonProps, SvgIconProps, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useTranslate from 'src/hooks/useTranslate';

export interface CopyIconProps {
  copyText?: string;
  defaultText?: string;
  successText?: string;
  iconProps?: SvgIconProps;
  props?: IconButtonProps;
}

export default function CopyIcon(params: CopyIconProps) {
  const { t } = useTranslate();
  const { copyText = '', defaultText = t('copy'), successText = t('copied'), iconProps, props } = params;
  const [tooltip, setTooltip] = useState(defaultText);

  return (
    <CopyToClipboard
      text={copyText}
      onCopy={() => {
        setTooltip(successText);
        setTimeout(() => {
          setTooltip(defaultText);
        }, 1000);
      }}
    >
      <Tooltip title={tooltip}>
        <IconButton {...props}>
          <ContentCopyIcon {...iconProps} fontSize="small" />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
}

interface Props {
  title: string;
  iconProps?: CopyIconProps;
}

export function TextCopy({ title, iconProps }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Typography>{title}</Typography>
      <CopyIcon {...iconProps} />
    </Box>
  );
}
