// pages/index.tsx
import React, { useState, useEffect } from 'react';
import CarCard from '../src/components/CarCard';

interface Car {
  imageUrl: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  id: string;
}

interface HomeProps {
  cars: Car[];
}

const Home: React.FC<HomeProps> = ({ cars }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [carsPerPage, setCarsPerPage] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of cars per page based on viewport width
      setIsMobile(window.innerWidth < 600);

      if (window.innerWidth < 600) {
        setCarsPerPage(1);
      } else if (window.innerWidth < 900) {
        setCarsPerPage(2);
      } else {
        setCarsPerPage(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + carsPerPage;
      return nextIndex >= cars.length ? 0 : nextIndex;
    })
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  const displayedCars = isMobile ? [cars[currentIndex]] : cars.slice(currentIndex, currentIndex + carsPerPage);
  // const displayedCarsWidth = `${100 / carsPerPage}%`;

  return (
    <div>
      <div className="carousel">

        <div className="carousel-inner">
          {displayedCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>

        {isMobile && (
          <div className="slider-controls">
            {cars.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        )}
      </div>
      <div>
        {(
          <img className="nav-button prev" width="25px" onClick={goToPrev} src='/images/chevron-circled.svg' />
        )}

        {(
          <button onClick={goToNext} className="nav-button next">Next</button>
        )}
      </div>

    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/cars.json');
  const cars: Car[] = await res.json();

  return {
    props: {
      cars,
    },
  };
}

export default Home;
