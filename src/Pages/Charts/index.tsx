import { Box, Divider, Grid, Typography } from '@mui/material';

export default function Charts() {
  return (
    <Box>
      <Typography color="text.primary" variant="h4">
        Line charts
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Grid container>
        <Grid item md={4} sm={6} xs={12}>
          123
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          123
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          123
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          123
        </Grid>
      </Grid>
    </Box>
  );
}
