import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../hooks/useTodos';

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

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => '123e4567-e89b-12d3-a456-426614174000',
});

describe('useTodos', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty todos', () => {
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toEqual([]);
    expect(result.current.filter).toBe('all');
  });
  
  it('loads todos from localStorage', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Test todo', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
  });
  
  it('adds a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('New todo');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('New todo');
    expect(result.current.todos[0].completed).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
  
  it('toggles a todo', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Test todo', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.toggleTodo('1');
    });
    
    expect(result.current.todos[0].completed).toBe(true);
    
    act(() => {
      result.current.toggleTodo('1');
    });
    
    expect(result.current.todos[0].completed).toBe(false);
  });
  
  it('deletes a todo', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Test todo', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.deleteTodo('1');
    });
    
    expect(result.current.todos).toHaveLength(0);
  });
  
  it('edits a todo', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Test todo', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.editTodo('1', 'Updated todo');
    });
    
    expect(result.current.todos[0].text).toBe('Updated todo');
  });
  
  it('filters todos correctly', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toHaveLength(2);
    
    act(() => {
      result.current.setFilter('active');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Todo 1');
    
    act(() => {
      result.current.setFilter('completed');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Todo 2');
  });
  
  it('clears completed todos', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.clearCompleted();
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Todo 1');
  });
  
  it('calculates todo counts correctly', () => {
    const mockTodos = JSON.stringify([
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
      { id: '3', text: 'Todo 3', completed: false, createdAt: new Date().toISOString() }
    ]);
    
    localStorageMock.getItem.mockReturnValueOnce(mockTodos);
    
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.totalTodos).toBe(3);
    expect(result.current.activeTodos).toBe(2);
    expect(result.current.completedTodos).toBe(1);
  });
});