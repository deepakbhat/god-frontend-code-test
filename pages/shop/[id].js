import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Logo , Button} from 'vcc-ui';

function ShopHere() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch('/api/cars.json')
      .then(response => response.json())
      .then(data => {
        const matchedCar = data.find(car => car.id === id);
        setCar(matchedCar);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <Container >
      <Row className="mb-4 justify-content-center">
        <Logo type="spreadmark" height={36} />
      </Row>
      <Row className="mb-4 justify-content-center">        
          <Button 
            href='https://www.volvocars.com/in/test-drive-booking' 
            target="_blank" 
            variant="primary"             
          >
            Book a Test Drive
          </Button>        
      </Row>      
      {car && (
        <div className="carDetails">
          <Row className="mb-4 justify-content-center">
            <Col xs={12} md={8}>
              <Image 
                src={car.imageUrl} 
                fluid 
                alt={`${car.modelName} image`} 
                className="image"
              />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <h2 className="modelName">{car.modelName}</h2>
              <p className="modelType">{car.modelType}</p>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default ShopHere;
