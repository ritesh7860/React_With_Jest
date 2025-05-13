import React, { useState } from 'react';
import { Check, Trash2, Edit, X, Save } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  toggleTodo,
  deleteTodo,
  editTodo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  
  const handleEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== text) {
      editTodo(id, trimmedText);
    } else {
      setEditText(text);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };
  
  return (
    <li 
      className="group flex items-center gap-3 p-3 border-b border-gray-200 last:border-0 transition-all"
      data-testid="todo-item"
    >
      <button
        onClick={() => toggleTodo(id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
          completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-blue-500'
        }`}
        data-testid="todo-checkbox"
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed && <Check size={16} />}
      </button>
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            autoFocus
            data-testid="edit-todo-input"
          />
          <button
            onClick={handleEdit}
            className="text-green-600 hover:text-green-700"
            aria-label="Save"
            data-testid="save-todo-button"
          >
            <Save size={18} />
          </button>
          <button
            onClick={() => {
              setEditText(text);
              setIsEditing(false);
            }}
            className="text-red-600 hover:text-red-700"
            aria-label="Cancel"
            data-testid="cancel-edit-button"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span 
            className={`flex-1 ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            data-testid="todo-text"
          >
            {text}
          </span>
          
          <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Edit"
              data-testid="edit-todo-button"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTodo(id)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              aria-label="Delete"
              data-testid="delete-todo-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;