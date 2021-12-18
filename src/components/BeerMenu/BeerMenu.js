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

  const hopAttributeFound = (beer, attribute, keyword) => {
    return beer.ingredients.hops.some(hop => hop[attribute].includes(keyword)); 
  }

  return (
    <>
      <Grid container spacing={3} className='beerMenu'>
          {beers.sort((a, b) => {return b.abv - a.abv}).map(beer => {
            const dryHopped = hopAttributeFound(beer, 'add', 'dry');
            const highlighted = dryHopped ? 'highlight': '';
            const containsLactose = hopAttributeFound(beer, 'name', 'Lactose');
              return (
                <Grid item xs={12} sm={6} md={4} key={beer.id}>
                  <Item>
                      <div className='beer'>
                          <div className='name'>{beer.name }</div>
                          <div className='tagline'>{beer.tagline}</div>
                          <div className={highlighted} data-testid="description">{beer.description}</div>
                          <div><img src={beer.image_url} data-testid="image"/></div>
                          <div data-testid="abv">{`abv: ${beer.abv}`}</div>
                          <div>{`ibu: ${beer.ibu}`}</div>
                          {containsLactose && <div className='warning'>Warning: Contains Lactose</div>}
                      </div>
                  </Item>
                </Grid>
              )
            })}
      </Grid>
      <p className='highlight'>* highlighted description indicates dry hop</p>
    </>
  );
}

export default BeerMenu;
