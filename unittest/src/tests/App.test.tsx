import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('renders the app with header and form', () => {
    render(<App />);
    
    expect(screen.getByText('TaskMaster')).toBeInTheDocument();
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
  });
  
  it('shows empty state when no todos', () => {
    render(<App />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
  });
  
  it('adds a new todo when form is submitted', async () => {
    render(<App />);
    
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New todo item');
    
    const button = screen.getByTestId('add-todo-button');
    await userEvent.click(button);
    
    expect(screen.getByText('New todo item')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
  
  it('loads todos from localStorage on initial render', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Saved todo', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    render(<App />);
    
    expect(screen.getByText('Saved todo')).toBeInTheDocument();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('todos');
  });
});