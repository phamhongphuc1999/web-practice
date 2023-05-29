import { Box, Container, Typography } from '@mui/material';
import Carousel from 'src/components/carousel';

interface Props {
  number: string;
}

function Item({ number }: Props) {
  return (
    <Box>
      <Typography>{number}</Typography>
    </Box>
  );
}

export default function CarouselElement() {
  return (
    <Container>
      <Carousel
        props={{ sx: { height: '100px' } }}
        currentIndex={0}
        items={['0', '1', '2', '3'].map((item, _) => (
          <Item key={item} number={item} />
        ))}
      />
    </Container>
  );
}
