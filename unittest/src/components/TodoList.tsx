import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo
}) => {
  if (todos.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-10 text-gray-500"
        data-testid="empty-state"
      >
        <p className="text-lg">No tasks found</p>
        <p className="text-sm">Add a new task to get started</p>
      </div>
    );
  }
  
  return (
    <ul 
      className="bg-white rounded-md shadow overflow-hidden"
      data-testid="todo-list"
    >
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;