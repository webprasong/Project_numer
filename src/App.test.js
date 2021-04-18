import React from "react";
import { render, screen } from '@testing-library/react';
import Home from './components/Home';
import "@testing-library/jest-dom";

it('Success', () => {
  render(<Home />);
  const buttonEl = screen.getByText("WELCOME");
  expect(buttonEl).toBeInTheDocument();
});

/* it("renders <h> message", () => {
    render(<Home/>);
    expect(screen.getByText("WELCOME")).toBeInTheDocument();
}); */