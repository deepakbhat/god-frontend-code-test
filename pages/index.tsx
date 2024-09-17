"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import CarCard from '../src/components/CarCard';
import { Row, Grid, Text, Spacer, IconButton, SelectInput, View, Logo, Nav, NavItem, Block } from 'vcc-ui';
import { Select } from "@volvo-cars/react-forms";

interface HomeProps {
  cars: Car[];
}

const Home: React.FC<HomeProps> = () => {
  // State management
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(true);
  const [carsPerPage, setCarsPerPage] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Fetch car data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get<Car[]>('/api/cars');
        setCarsList(data);
      } catch (error) {
        setFetchSuccess(false);
      }
    };
    fetchCars();
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 600;
      setIsMobile(isMobileView);
      setCarsPerPage(isMobileView ? 1 : 4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter cars based on search value
  const filteredCars = useMemo(() => {
    return searchValue
      ? carsList.filter(car => car.bodyType === searchValue)
      : carsList;
  }, [searchValue, carsList]);

  // Compute the list of body types for the filter dropdown
  const bodyTypes = useMemo(() => {
    const types = new Set(carsList.map(car => car.bodyType));
    return Array.from(types);
  }, [carsList]);

  // Compute the list of cars to be displayed
  const displayedCars = useMemo(() => {
    return isMobile
      ? [filteredCars[currentIndex]]
      : filteredCars.slice(currentIndex, currentIndex + carsPerPage);
  }, [filteredCars, currentIndex, carsPerPage, isMobile]);

  // Pagination handlers
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + carsPerPage) % filteredCars.length);
  }, [carsPerPage, filteredCars.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - carsPerPage + filteredCars.length) % filteredCars.length);
  }, [carsPerPage, filteredCars.length]);

  // Handle search filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchValue(e.target.value);
  };

  // Render error message if fetching fails
  if (!fetchSuccess) {
    return (
      <Grid>
        <Row align='center'>
          <Text>Error while displaying the cars.</Text>
        </Row>
        <Row align='center'>
          <Text>Please visit 'www.volvocars.com'</Text>
        </Row>
      </Grid>
    );
  }

  return (
    <div >
      <div className="filterbar">
        <SelectInput
          onChange={handleSearchChange}
          label='Body Type'
          value={searchValue}
        >
          <option value=''>All</option>
          {bodyTypes.map(type => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </SelectInput>
      </div>
      <div className="carousel">
        <div className="carousel-inner">
          {displayedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      <Spacer />
      <Spacer />
      <Spacer />

      {/* Carousel navigation for non-mobile view */}
      {!isMobile && filteredCars.length > carsPerPage && (
        <div>
          <Grid >
            <Row align="end">
              <IconButton
                variant="outline"
                aria-label="Previous"
                iconName="navigation-chevronback"
                bleed={false}
                onClick={goToPrev}
              />
              <Spacer />
              <Spacer />
              <IconButton
                variant="outline"
                aria-label="Next"
                iconName="navigation-chevronforward"
                bleed={false}
                onClick={goToNext}
              />
            </Row>
          </Grid>
        </div>
      )}

      {/* Carousel controls for mobile view */}
      {isMobile && filteredCars.length > carsPerPage && (
        <div className="slider-controls">
          {filteredCars.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
