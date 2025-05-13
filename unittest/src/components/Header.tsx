import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-2 mb-8">
      <CheckSquare size={28} className="text-blue-500" />
      <h1 className="text-2xl font-bold text-gray-800">TaskMaster</h1>
    </header>
  );
};

export default Header;