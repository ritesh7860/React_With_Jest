import { useState, useEffect } from 'react';
import { Todo, TodoFilter } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos, (key, value) => 
          key === 'createdAt' ? new Date(value) : value
        );
      } catch (e) {
        console.error('Error parsing todos from localStorage', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos([...todos, newTodo]);
  };
  
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const editTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    clearCompleted,
    totalTodos: todos.length,
    activeTodos: todos.filter(todo => !todo.completed).length,
    completedTodos: todos.filter(todo => todo.completed).length
  };
};