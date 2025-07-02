import { useState } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <aside className={`bg-white shadow-lg w-64 p-6 space-y-4 hidden md:block`}>
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-blue-600 font-semibold hover:underline">All Tasks</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Completed</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Pending</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
      </nav>
    </aside>
  );
};

export default Sidebar; 