import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  SvgIconProps,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export interface CopyIconProps extends IconButtonProps {
  copyText?: string;
  defaultText?: string;
  successText?: string;
  iconProps?: SvgIconProps;
}

export default function CopyIcon(params: CopyIconProps) {
  const { t } = useLocalTranslate();
  const {
    copyText = '',
    defaultText = t('copy'),
    successText = t('copied'),
    iconProps,
    ...props
  } = params;
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

interface Props extends BoxProps {
  title: string;
  textProps?: TypographyProps;
  iconProps?: CopyIconProps;
}

export function TextCopy({ title, textProps, iconProps, ...props }: Props) {
  return (
    <Box display="flex" alignItems="center" {...props}>
      <Typography {...textProps}>{title}</Typography>
      <CopyIcon {...iconProps} />
    </Box>
  );
}
