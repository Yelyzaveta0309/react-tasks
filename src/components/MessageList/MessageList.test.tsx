import React from 'react';
import { render } from '@testing-library/react';
import { MessageList } from './MessageList';
import '@testing-library/jest-dom';

describe('MessageList', () => {
  it('renders messages correctly', () => {
    const messages = [
        { id: '1', author: 'user', text: 'Hello' },
        { id: '2', author: 'user', text: 'Hi there' },
      ];

    const { getByText } = render(<MessageList messages={messages} />);

    messages.forEach((message) => {
      const messageText = getByText(`${message.author}: ${message.text}`);
      expect(messageText).toBeInTheDocument();
    });
  });
});
