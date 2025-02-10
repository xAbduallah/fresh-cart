import { Loader } from 'lucide-react';
import { useState, useContext } from "react";
import { ShoppingCart, User2Icon, Package, Heart, LogOut, LogIn, ShoppingBag, Moon, Sun, Menu } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";
import FreshLogo from "../../assets/images/freshcart-logo.svg";
import { ThemeContext } from '../../Contexts/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logout } = useContext(UserContext);
  const { numOfCartItems, destroyCart, gettingCart } = useContext(CartContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  function logoutUser() {
    logout();
    destroyCart();
  }

  const menuItems = user ? [
    { icon: <Package className="w-4 h-4" />, label: 'Orders', link: '/allorders' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist', link: '/wishlist' },
    {
      icon: <LogOut className="w-4 h-4" />, label: 'Logout',
      onClick: () => { logoutUser(); setUserMenuOpen(false); },
      className: 'text-red-500 hover:text-red-600'
    }
  ] : [
    {
      icon: <LogIn className="w-4 h-4" />,
      label: 'Login',
      link: '/login',
      onClick: () => setUserMenuOpen(false)
    }
  ];

  const navLinkStyles = (isActive) => `
    relative px-3 py-2 text-[var(--text-primary)] hover:text-[var(--text-tertiary)] transition-colors duration-200
    ${isActive ? 'text-[var(--text-secondary)]' : ''}
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
    after:left-0 after:bottom-0 after:bg-[var(--bg-secondary)] 
    after:transition-transform after:duration-300
    hover:after:scale-x-100`;

  return (
    <>
      <nav>
        <div className='flex justify-between items-center bg-[var(--bg-secondary)] p-5'>
          {/* Logo Section */}
          <div className='flex items-center gap-10 ps-[5%]'>
            <img
              onClick={() => { Navigate('/') }}
              src={FreshLogo}
              alt='main logo'
              className='h-10 cursor-pointer dark:brightness-0 dark:invert'
            />
            <div className='hidden lg:flex text-[var(--text-secondary)] dark:text-gray-300 text-xl gap-3 items-center'>
              <NavLink to='/' className={({ isActive }) => navLinkStyles(isActive)}>Home</NavLink>
              <NavLink to='/products' className={({ isActive }) => navLinkStyles(isActive)}>Products</NavLink>
              <NavLink to='/categories' className={({ isActive }) => navLinkStyles(isActive)}>Categories</NavLink>
              <NavLink to='/brands' className={({ isActive }) => navLinkStyles(isActive)}>Brands</NavLink>
              <NavLink to="/cart" className="relative flex items-center justify-center p-2 transition-transform duration-200 hover:scale-110">

                <ShoppingCart className="h-8 w-8" />
                {
                  <span className="absolute -top-2 right-2">
                    {
                      gettingCart ? <> <Loader className="w-5 h-5 animate-spin text-[var(--text-primary)]" /> </> :
                        numOfCartItems > 0 ?
                          <span className='bg-green-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-semibold shadow-md'>{numOfCartItems}</span> : ''
                    }
                  </span>
                }
              </NavLink>

            </div>
          </div>

          {/* Social Icons and Theme Toggle */}
          <div className="hidden gap-3 lg:flex items-center text-[#000] dark:text-white text-[1.4rem] lg:pe-[5%]">
            {/* Theme Toggle Button */}
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] transition-colors">
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* User Menu Button */}
            <div className="relative">
              <button className="p-2 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--bg-primary)] transition" onClick={() => setUserMenuOpen((prev) => !prev)}>
                <User2Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Desktop User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-primary)] rounded-lg shadow-xl 
                                border border-gray-100 dark:border-gray-700 py-2 z-50">
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  )}

                  <div className="py-1">
                    {menuItems.map((item) => (
                      <div key={item.label}>
                        {item.link ? (
                          <NavLink
                            to={item.link}
                            className={`flex items-center gap-3 px-4 py-2 text-sm 
                                            ${item.className || 'text-gray-700 dark:text-gray-300'} 
                                            hover:bg-[var(--bg-tertiary)] 
                                            transition-colors duration-200`}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {item.icon}
                            {item.label}
                          </NavLink>
                        ) : (
                          <button
                            className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${item.className || 'text-gray-700 dark:text-gray-300'} hover:bg-[var(--bg-tertiary)] transition-colors duration-200`} onClick={item.onClick}>
                            {item.icon}
                            {item.label}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Hamburger Menu */}
          <div className='flex lg:hidden'>
            <button className='text-3xl focus:outline-none' onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} flex flex-col px-20 bg-[var(--bg-primary)] lg:hidden`}>
          {/* User Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            {user ?
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-200">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              : (
                <NavLink to="/login" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </NavLink>
              )}
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3 space-y-2">
            {/* Home Link */}
            <NavLink to='/' onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">
              <i className="fa-solid fa-home w-5 h-5"></i>
              <span>Home</span>
            </NavLink>

            {/* Products Link */}
            <NavLink
              to='/products'
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Products</span>
            </NavLink>

            {/* Cart Link */}
            <NavLink
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
            >
              <div className="flex items-center gap-2 flex-1">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {numOfCartItems > 0 && (
                  <span className="ml-auto bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {numOfCartItems}
                  </span>
                )}
              </div>
            </NavLink>

            {menuItems.map((item) => (
              item.link ?
                <NavLink key={item.label} to={item.link}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors ${item.className || 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
                  onClick={() => setMenuOpen(false)}>
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
                :
                <>
                  {/* Theme Toggle */}
                  <button onClick={() => {
                    toggleDarkMode();
                    setMenuOpen(false);
                  }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
                  >
                    {darkMode ?
                      <span className='flex items-center gap-2'><Sun className="w-5 h-5 text-yellow-500" />Light Mode</span>
                      :
                      <span className='flex items-center gap-2'><Moon className="w-5 h-5" />Dark Mode</span>
                    }

                  </button>
                  <button
                    key={item.label}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors
                    ${item.className || 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
                    onClick={item.onClick}>
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </>
            ))}
          </div>
        </div>

        {
          location.pathname !== '/' &&
          <div className='flex justify-between items-center mx-[25%] py-2 border-x-8 border-[var(--bg-secondary)]' />
        }
      </nav>
    </>

  );
}
