import React from 'react';
import { render, screen } from '@testing-library/react';
import BoardPage from '.';

test('test 시작하기', () => {
  render(<BoardPage />);
  const divEl = screen.getByText(/123/);
  expect(divEl).toBeInTheDocument();
});
