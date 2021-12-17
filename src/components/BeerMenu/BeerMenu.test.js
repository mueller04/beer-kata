import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BeerMenu from './BeerMenu';

describe('<BeerMenu />', () => {

  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should contain all props for beers', () => {
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
        ibu: BEER1_IBU
      },
      {
        id: 'test2-id', 
        name: BEER2_NAME,
        tagline: BEER2_TAGLINE,
        image_url: BEER2_URL,
        abv: BEER2_ABV,
        ibu: BEER2_IBU      }
    ]
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
});
