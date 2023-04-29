import React from 'react'
import { Form } from './Form';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Form', () => {

    it('render component', () => {
        const { getByRole } = render(<Form />);
        const inputElement = getByRole('textbox');
        const buttonElement = getByRole('button');
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it('render with snapshot', () => {
        const {asFragment} = render(<Form />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should update input value on change', () => {
        const { getByRole } = render(<Form />);
        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input).toHaveValue('test');
    });

    it('button is disabled when input value is empty', () => {
        const { getByRole } = render(<Form />);
        const inputElement = getByRole('textbox');
        const buttonElement = getByRole('button');
        expect(buttonElement).toBeDisabled();
        fireEvent.change(inputElement, { target: { value: 'test message' }})
    });

    it('clears the input value when the form is submitted', () => {
        const { getByRole } = render(<Form />);
        const input = getByRole('textbox') as HTMLInputElement;
        const button = getByRole('button') as HTMLButtonElement;
    
        fireEvent.change(input, { target: { value: 'Hello, world!' } });
        fireEvent.click(button);
    
        expect(input.value).toBe('');
    });
});
