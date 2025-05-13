import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (trimmedText) {
      addTodo(trimmedText);
      setText('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6 flex gap-2"
      data-testid="todo-form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        data-testid="todo-input"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!text.trim()}
        data-testid="add-todo-button"
      >
        <PlusCircle size={18} />
        <span>Add</span>
      </button>
    </form>
  );
};

export default TodoForm;