import React from 'react'
import { Button } from './Button';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


describe('Button', () => {
    it('render component', () => {
        render(<Button disabled onButtonClick={()=>console.log('hello')}/>);
    });

    it('render with snapshot', () => {
        const {asFragment} = render(<Button disabled onButtonClick={()=>console.log('hello')}/>)
        expect(asFragment()).toMatchSnapshot();
    })

    it('render component with text', () => {
        render(<Button disabled onButtonClick={()=>console.log('hello')}/>);
        expect(screen.getByText(/click/)).toBeInTheDocument();
    })

    it('render multiply components', () => {
        render(
            <>
                <Button disabled onButtonClick={()=>console.log('hello')}/>
                <Button disabled onButtonClick={()=>console.log('hello')}/>
            </>
        );
        expect(screen.queryAllByRole('button').length).toBe(2);
    });

    it('button is disabled', () => {
        render(<Button disabled />)

        expect(screen.getByText('click')).toBeDisabled;
    })

    // it('button have style background red', () =>{
    //     render(<Button/>);

    //     expect(screen.getByText('click')).toHaveStyle({backgroundColor: 'red'});
    // });

    // it('button click with userEvent', () => {
    //     const mockHandler = jest.fn();

    //     render(<Button onButtonClick={mockHandler} />);

    //     userEvent.click(screen.getByText('click'));

    //     expect(mockHandler).toHaveBeenCalledTimes(1);
    // })

    // it('button async click', async () => {
    //     const mockHandler = jest.fn();

    //     render(<Button disabled={true} onButtonClick={() => setTimeout(mockHandler, 500)} />);

    //     userEvent.click(screen.getByText('click'));

    //     await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1));

    // })
});