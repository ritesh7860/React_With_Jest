import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';


describe('App component', () => {
  render(<App />);
  test('Heading is Present or not', () => {
    const text = screen.getByText("Vite + React");
    expect(text).toBeInTheDocument();
  });
  test('renders with initial count', () => {
    render(<App />);
    // Check that the count starts at 0
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    // Simulate a click
    fireEvent.click(button);

    // Check that the count is now 1
    expect(button).toHaveTextContent('count is 1');
  });
  test('renders with increments on click', () => {
    render(<App />);

    // Check that the count starts at 0
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    // Simulate a click
    fireEvent.click(button);
    fireEvent.doubleClick(button);

    // Check that the count is now 1
    expect(button).toHaveTextContent('count is 1');
  });
  test('renders with increments on double click', () => {
    render(<App />);

    // Check that the count starts at 0
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    // Simulate a click
    fireEvent.click(button);
    fireEvent.click(button);

    // Check that the count is now 1
    expect(button).toHaveTextContent('count is 2');
  });
});
