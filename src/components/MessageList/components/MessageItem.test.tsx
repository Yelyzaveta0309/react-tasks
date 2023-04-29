import React from 'react';
import { render } from '@testing-library/react';
import { MessageItem } from './MessageItem';
import '@testing-library/jest-dom';


describe('MessageItem', () => {
  it('renders the author name and message text', () => {
    const message = {
      id: '1',
      author: 'user',
      text: 'Hello, world!',
    };
    const { getByText } = render(<MessageItem message={message} />);
    expect(getByText(`${message.author}: ${message.text}`)).toBeInTheDocument();
  });
});





