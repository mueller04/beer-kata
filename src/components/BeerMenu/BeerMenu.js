import React from 'react';
import './BeerMenu.css';
import getBeerMenu from '../../services/beerService';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'

const BeerMenu = () => {
  const [beers, setBeers] = React.useState([]);

  React.useEffect(() => {
    getBeerMenu().then(response => {
      setBeers(response.data);
    });
  }, []);

  return (
    <Grid container spacing={3} className='beerMenu'>
        {beers.map(beer => {
            return (
              <Grid item xs={12} sm={6} md={4} key={beer.id}>
                <Item>
                    <div className='beer'>
                        <div className='name'>{beer.name }</div>
                        <div className='tagline'>{beer.tagline}</div>
                        <div>{beer.description}</div>
                        <div><img src={beer.image_url} data-testid="image"/></div>
                        <div>{`abv: ${beer.abv}`}</div>
                        <div>{`ibu: ${beer.ibu}`}</div>
                    </div>
                </Item>
              </Grid>
            )
          })}
    </Grid>
  );
}

export default BeerMenu;
