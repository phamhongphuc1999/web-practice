import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function Item() {
  return (
    <div className="flex items-center justify-between min-w-[100px]">
      <div />
      <p className="uppercase text-white text-[50px]">make your move</p>
      <p>Start War</p>
      <p className="uppercase text-white text-[50px]">make your move</p>
      <div />
    </div>
  );
}

export default function ScrollComponent() {
  return (
    <div>
      <div className="h-[300px] flex items-center mt-5">
        <Carousel
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={500}
          customTransition="all 2000ms linear"
          transitionDuration={2000}
          containerClass="w-full"
          itemClass="image-item"
        >
          <Item />
        </Carousel>
      </div>
    </div>
  );
}
