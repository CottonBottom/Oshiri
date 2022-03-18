import React from 'react';
import { render, screen } from '@testing-library/react';
import Sandbox from './sandbox/Sandbox';

test('renders learn react link', () => {
  render(<Sandbox />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
