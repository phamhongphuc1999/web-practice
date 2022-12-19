import { IconButton, TextField, TextFieldProps } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface Props {
  props?: TextFieldProps;
}

export default function PasswordTextField({ props }: Props) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <TextField
      {...props}
      type={isPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ),
      }}
    />
  );
}
