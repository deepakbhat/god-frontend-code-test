import React from 'react';
import { Row, Link, Grid, Block, Text, Spacer } from 'vcc-ui';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="car-card">
      <Block extend={{ textAlign: 'left', marginLeft: '5px', marginBlock: '5px', paddingBlockStart: '5px' }}>
        <Grid>
          <Row align="start">
            <Text variant="hillary" subStyle="standard">
              {car.bodyType}
            </Text>
          </Row>
        </Grid>
        <Spacer />
        <Grid>
          <Row align="start">
            <Text variant="hillary" subStyle="emphasis">
              {car.modelName}
            </Text>
            <Spacer />
            <Text variant="hillary" subStyle="standard">
              {car.modelType}
            </Text>
          </Row>
        </Grid>
      </Block>
      <div className="car-iamge-wrapper">
        <img src={car.imageUrl} className="car-image" alt={car.modelName} />
      </div>
      <div className="stack-text">
        <Grid>
          <Row align="center">
            <Link className="button-text" arrow="right" href={`/learn/${car.id}`}>
              LEARN
            </Link>
            <Spacer />
            <Spacer />
            <Spacer />
            <Link className="button-text" arrow="right" href={`/shop/${car.id}`}>
              SHOP
            </Link>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default CarCard;
