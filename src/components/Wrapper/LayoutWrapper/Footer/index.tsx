import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box height="20px" display="flex">
      <Typography>COPYRIGHT © {new Date().getFullYear()}&nbsp;</Typography>
      <Link href="https://github.com/phamhongphuc1999/web-practice" target="_blank">
        Main page
      </Link>
    </Box>
  );
}
