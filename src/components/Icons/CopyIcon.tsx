import { IconButton, IconButtonProps, SvgIconProps, Tooltip } from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props {
  copyText?: string;
  defaultText?: string;
  successText?: string;
  iconProps?: SvgIconProps;
  props?: IconButtonProps;
}

export default function CopyIcon(params: Props) {
  const { copyText = '', defaultText = 'Copy', successText = 'Copied!', iconProps, props } = params;
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
