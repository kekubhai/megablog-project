import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Posts', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="py-4 shadow-lg bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <Logo width="70px" className="hover:opacity-90 transition-opacity" />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex space-x-6 text-white text-lg">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition-colors" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;