import { Grid } from '@mui/material';
import { BounceLoaderBox } from 'src/components/AnimationComponent/BounceLoader';
import { CircleLoaderBox } from 'src/components/AnimationComponent/CircleLoader';
import { EllipsisIconBox } from 'src/components/AnimationComponent/EllipsisIcon';
import { LoadingIconBox } from 'src/components/AnimationComponent/LoadingIcon';

export default function AnimationPage() {
  return (
    <Grid container>
      <Grid item md={4} sm={6} xs={12}>
        <LoadingIconBox />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <EllipsisIconBox />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <BounceLoaderBox />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <CircleLoaderBox />
      </Grid>
    </Grid>
  );
}
