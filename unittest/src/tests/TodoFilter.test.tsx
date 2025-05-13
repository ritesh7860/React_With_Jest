import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoFilter from '../components/TodoFilter';
import { TodoFilter as FilterType } from '../types/todo';

describe('TodoFilter', () => {
  const mockProps = {
    filter: 'all' as FilterType,
    setFilter: vi.fn(),
    activeCount: 3,
    completedCount: 2,
    clearCompleted: vi.fn(),
  };

  it('renders the filter component correctly', () => {
    render(<TodoFilter {...mockProps} />);
    
    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
    expect(screen.getByText('3 items left')).toBeInTheDocument();
    expect(screen.getByTestId('clear-completed')).toBeInTheDocument();
  });
  
  it('hides clear completed button when no completed todos', () => {
    render(<TodoFilter {...mockProps} completedCount={0} />);
    
    expect(screen.queryByTestId('clear-completed')).not.toBeInTheDocument();
  });
  
  it('shows active filter button as selected', () => {
    render(<TodoFilter {...mockProps} filter="active" />);
    
    const activeButton = screen.getByTestId('filter-active');
    expect(activeButton).toHaveClass('bg-blue-500');
    
    const allButton = screen.getByTestId('filter-all');
    expect(allButton).not.toHaveClass('bg-blue-500');
  });
  
  it('calls setFilter with the correct filter when clicked', async () => {
    render(<TodoFilter {...mockProps} />);
    
    const activeButton = screen.getByTestId('filter-active');
    await userEvent.click(activeButton);
    
    expect(mockProps.setFilter).toHaveBeenCalledWith('active');
  });
  
  it('calls clearCompleted when clear button is clicked', async () => {
    render(<TodoFilter {...mockProps} />);
    
    const clearButton = screen.getByTestId('clear-completed');
    await userEvent.click(clearButton);
    
    expect(mockProps.clearCompleted).toHaveBeenCalled();
  });
  
  it('displays correct text for singular item left', () => {
    render(<TodoFilter {...mockProps} activeCount={1} />);
    
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });
});