import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/auth/user`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogout = async () => {
    await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Task Manager</h1>
      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdown(!dropdown)}>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=4f46e5&color=fff&rounded=true&size=32`}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span className="hidden sm:block text-gray-700 font-medium">{user.name}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
            {dropdown && (
              <div className="absolute right-0 mt-12 w-40 bg-white rounded shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            onClick={handleLogin}
          >
            Login with Google
          </button>
        )}
      </div>
    </header>
  );
};

export default Header; 