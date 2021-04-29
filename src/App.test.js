import React from "react";
import { render, screen } from '@testing-library/react';
import Home from './components/Home';
import "@testing-library/jest-dom";
import LU_Decomposition from './components/pages/linear/LU_Decomposition';

it('Success found "WELCOME" ', () => {
  render(<Home />);
  const buttonEl = screen.getByText("WELCOME");
  expect(buttonEl).toBeInTheDocument();
});

it('Success found button', () => {
  render(<LU_Decomposition />);
  const btn = screen.getByTestId("button");
  expect(btn).not.toBeDisabled();
})


