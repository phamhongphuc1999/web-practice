import { useState } from 'react';
import { Car } from 'src/global';

interface Props {
  car: Car;
}

function CarCard({ car }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={toggleExpand}
      style={{
        width: '150px',
        padding: '10px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        transition: 'all 0.3s',
        height: expanded ? '200px' : '100px',
        overflow: 'hidden',
      }}
    >
      <h4>
        {car.make} {car.model}
      </h4>
      <p>Price: ${car.price}</p>
      {expanded && <p>Extra details here...</p>}
    </div>
  );
}

export default CarCard;
