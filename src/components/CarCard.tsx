// components/CarCard.tsx
import React from 'react';
import { Flex, Row, Link, Grid, Block, Text, Spacer, Card} from 'vcc-ui';
// import '@volvo-cars/css/font-face.css';
interface Car {
  imageUrl: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  id: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="car-card">
{/* <Card> */}
      <Block extend={{ textAlign: 'left' }}>
        <Grid>
          <Row align="start">
            <Text variant="hillary" subStyle="standard">
              {car.bodyType}
            </Text>
          </Row>
        </Grid>
        <Spacer/>
        <Grid>
          <Row align="start">
            <Text variant="hillary" subStyle="emphasis">
              {car.modelName}
            </Text>
            <Spacer/>
            <Text variant="hillary" subStyle="standard">
              {car.modelType}
            </Text>
          </Row>
        </Grid>

      </Block>
      <img src={car.imageUrl} className="car-image" alt={car.modelName} />
      <h2 className="modelName">{car.modelName}</h2>


      <div className="stack-text">
        <Grid>
          <Row align="center">
            <Link className="button-text" arrow="right" href="#top">
              LEARN
            </Link>
            <Spacer/>
            <Spacer/>
            <Link className="button-text" arrow="right" href="#top">
              SHOP
            </Link>
          </Row>

        </Grid>


      </div>
      {/* </Card> */}
    </div>
  );
};

export default CarCard;
