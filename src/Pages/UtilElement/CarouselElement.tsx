import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
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
  const [location, setLocation] = useState(0);

  return (
    <Container>
      <Carousel
        props={{ sx: { height: '100px' } }}
        location={location}
        setLocation={setLocation}
        items={['0', '1', '2', '3'].map((item, _) => (
          <Item key={item} number={item} />
        ))}
      />
    </Container>
  );
}
