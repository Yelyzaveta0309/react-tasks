import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './Home';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders the Home component with the correct text', () => {
    const { getByText } = render(<Home />);
    const homeText = getByText('Home');
    expect(homeText).toBeInTheDocument();
  });
});
