import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { About, AboutProps } from './About';
import '@testing-library/jest-dom';


describe('About', () => {

    const toggleMock = jest.fn();
    const defaultProps: AboutProps = {
      visible: true,
      toggle: toggleMock,
    };
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should render properly', () => {
      const { getByText, getByRole } = render(<About {...defaultProps} />);
      expect(getByText('About')).toBeInTheDocument();
      expect(getByRole('checkbox')).toBeInTheDocument();
      expect(getByText('changeVisible')).toBeInTheDocument();
    });

    it('should call toggle function when the button is clicked', () => {
        const { getByText } = render(<About {...defaultProps} />);
        const button = getByText('changeVisible');
        fireEvent.click(button);
        expect(toggleMock).toHaveBeenCalledTimes(1);
    });
  
    it('should show the checkbox as checked when visible is true', () => {
        const { getByRole } = render(<About {...defaultProps} />);
        const checkbox = getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });
    
    it('should show the checkbox as unchecked when visible is false', () => {
        const { getByRole } = render(<About {...defaultProps} visible={false} />);
        const checkbox = getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });
});
