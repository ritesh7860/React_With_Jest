import React from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    clearCompleted,
    activeTodos,
    completedTodos
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Header />
        //test
        <TodoForm addTodo={addTodo} />
        
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        
        {(activeTodos > 0 || completedTodos > 0) && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            activeCount={activeTodos}
            completedCount={completedTodos}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;