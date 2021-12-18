import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BeerMenu from './BeerMenu';

describe('<BeerMenu />', () => {

  it('should render all displayed props for beers', () => {
    const BEER1_NAME = 'test-name';
    const BEER1_TAGLINE = 'test-tagline';
    const BEER1_URL = 'test-url';
    const BEER1_ABV = 'test-abv';
    const BEER1_IBU = 'test-ibu';

    const BEER2_NAME = 'test2-name';
    const BEER2_TAGLINE = 'test2-tagline';
    const BEER2_URL = 'test2-url';
    const BEER2_ABV = 'test2-abv';
    const BEER2_IBU = 'test2-ibu';

    const initialState = [
      {
        id: 'test-id', 
        name: BEER1_NAME,
        tagline: BEER1_TAGLINE,
        image_url: BEER1_URL,
        abv: BEER1_ABV,
        ibu: BEER1_IBU,
        ingredients: {
            hops: [
              {
                name: '',
                add: 'nothing'
              }
            ]
          }
      },
      {
        id: 'test2-id', 
        name: BEER2_NAME,
        tagline: BEER2_TAGLINE,
        image_url: BEER2_URL,
        abv: BEER2_ABV,
        ibu: BEER2_IBU    ,
        ingredients: {
          hops: [
            {
              name: '',
              add: 'nothing'
            }
          ]
        }  
      }
    ];
    React.useState = jest.fn().mockReturnValue([initialState, {}])

    const result = render(<BeerMenu />);
    const element = result.baseElement;

    expect(element).toHaveTextContent(BEER1_NAME);
    expect(element).toHaveTextContent(BEER1_TAGLINE);
    expect(element).toHaveTextContent(BEER1_ABV);
    expect(element).toHaveTextContent(BEER1_IBU);
    const imageResult = result.getAllByTestId('image')[0]
    expect(imageResult.src).toContain(BEER1_URL)

    expect(element).toHaveTextContent(BEER2_NAME);
    expect(element).toHaveTextContent(BEER2_TAGLINE);
    expect(element).toHaveTextContent(BEER2_ABV);
    expect(element).toHaveTextContent(BEER2_IBU);
    const imageResult2 = result.getAllByTestId('image')[1]
    expect(imageResult2.src).toContain('test2-url')
  });

  it('should sort beers by ABV Descending', () => {
    const initialState = [
      {
        id: 'test-id', 
        abv: 1.1,
        ingredients: {
          hops: [
            {
              name: '',
              add: 'nothing'
            }
          ]
        }
      },
      {
        id: 'test2-id', 
        abv: 1.2,
        ingredients: {
          hops: [
            {
              name: '',
              add: 'nothing'
            }
          ]
        }
      }
    ];
    React.useState = jest.fn().mockReturnValue([initialState, {}])

    const result = render(<BeerMenu />);

    const beerABVs = result.getAllByTestId('abv');
    expect((beerABVs[0].textContent)).toEqual('abv: 1.2');
    expect((beerABVs[1].textContent)).toEqual('abv: 1.1');
  });

  it('should highlight dry hopped beers', () => {
    const initialState = [
      {
        id: 'test-id',
        description: 'counts as a highlighted element' ,
        ingredients: {
          hops: [
            {
              name: '',
              add: 'dry'
            }
          ]
        }
      },
      {
        id: 'test2-id', 
        description: 'does not count as a highlighted element' ,
        ingredients: {
          hops: [
            {
              name: '',
              add: 'wet'
            }
          ]
        }
      }
    ];
    React.useState = jest.fn().mockReturnValue([initialState, {}])

    const result = render(<BeerMenu />);
    const element = result.baseElement;

    const highlightedEls = element.getElementsByClassName('highlight');
    const extraHighlightDescriptionPageKeyElement = 1;
    expect((highlightedEls.length)).toEqual(1 + extraHighlightDescriptionPageKeyElement);
  });

  it('should display a warning for each beer which contains lactose', () => {
    const initialState = [
      {
        id: 'test-id', 
        ingredients: {
          hops: [
            {
              name: 'Safe Ingredient',
              add: 'nothing'
            }
          ]
        }
      },
      {
        id: 'test2-id', 
        ingredients: {
          hops: [
            {
              name: 'Lactose',
              add: 'nothing',
            }
          ]
        }
      },
      {
        id: 'test3-id', 
        ingredients: {
          hops: [
            {
              name: 'Lactose',
              add: 'nothing',
            }
          ]
        }
      }
    ];
    React.useState = jest.fn().mockReturnValue([initialState, {}])

    const result = render(<BeerMenu />);
    const element = result.baseElement;

    const highlightedEls = element.getElementsByClassName('warning');
    expect((highlightedEls.length)).toEqual(2);
  });
});
