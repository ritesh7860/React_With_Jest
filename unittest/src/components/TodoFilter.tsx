import React from 'react';
import { TodoFilter as FilterType } from '../types/todo';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  clearCompleted: () => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  setFilter,
  activeCount,
  completedCount,
  clearCompleted
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pt-4 pb-2 border-t border-gray-200">
      <p className="text-sm text-gray-600 mb-2 sm:mb-0">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </p>
      
      <div className="flex gap-2 mb-2 sm:mb-0">
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
          dataTestId="filter-all"
        >
          All
        </FilterButton>
        <FilterButton 
          active={filter === 'active'} 
          onClick={() => setFilter('active')}
          dataTestId="filter-active"
        >
          Active
        </FilterButton>
        <FilterButton 
          active={filter === 'completed'} 
          onClick={() => setFilter('completed')}
          dataTestId="filter-completed"
        >
          Completed
        </FilterButton>
      </div>
      
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          data-testid="clear-completed"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dataTestId: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children, dataTestId }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-md text-sm transition-colors ${
      active
        ? 'bg-blue-500 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`}
    data-testid={dataTestId}
  >
    {children}
  </button>
);

export default TodoFilter;