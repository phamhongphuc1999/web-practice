import { Car } from 'src/global';
import CarCard from './CarCard';

interface Props {
  cars: Car[];
  filter: string;
}

function CarList({ cars, filter }: Props) {
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(filter.toLowerCase()) ||
      car.model.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {filteredCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;
