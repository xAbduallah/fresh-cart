import { NavLink, useNavigate } from "react-router-dom";
import FreshLogo from "../assets/images/freshcart-logo.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { User2Icon } from "lucide-react";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext"

export default function Navbar() {
  const Navigate = useNavigate(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logout } = useContext(UserContext);

  return (
    <>
      <nav>
        <div className='flex justify-between items-center bg-[#F0F3F2] p-5'>
          {/* Logo Section */}
          <div className='flex items-center gap-10 ps-[5%]'>
            <img onClick={() => { Navigate('/') }} src={FreshLogo} alt='main logo' className='h-10 cursor-pointer' />
            <div className='hidden lg:flex text-[#6E6E6F] text-xl gap-3'>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/'>Cart</NavLink>
              <NavLink to='/'>Products</NavLink>
              <NavLink to='/'>Categories</NavLink>
              <NavLink to='/'>Brands</NavLink>
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden gap-3 lg:flex items-center text-[#000] text-[1.4rem] lg:pe-[5%]">
            <a href='/'>
              <i className='fa-brands fa-instagram'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-facebook'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-tiktok'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-twitter'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-linkedin'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-youtube'></i>
            </a>

            {/* <div className="bg-gray-300 px-2 rounded-lg">
              {
                !user || user.token === '' ?
                  <NavLink to='/login' className="text-[#229442]">Login</NavLink> : <span className="text-red-500 cursor-pointer" onClick={logout}>Logout</span>
              }
            </div> */}
            <div className="relative">
              {/* Burger Icon */}
              <button
                className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <User2Icon className="w-6 h-6 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-[-4rem] mt-2 bg-white shadow-2xl rounded-lg w-40 z-10 px-3">
                  <ul className="py-2 flex flex-col items-center">
                    {!user || user.token === "" ? (
                      <li>
                        <NavLink to="/login" className="block px-4 py-2 text-gray-700 hover:text-gray-400" onClick={() => setUserMenuOpen(false)}>
                          Login
                        </NavLink>
                      </li>
                    ) : (
                      <>
                        {/* <li>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gray-400"
                            onClick={() => { setUserMenuOpen(false); navigate("/settings"); }}>
                            Settings
                          </button>
                        </li> */}
                        <li>
                            <button className="block w-full text-left px-4 text-red-500 hover:text-red-400"
                            onClick={() => { logout(); setUserMenuOpen(false); }}>
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Hamburger Menu */}
          <div className='flex lg:hidden'>
            <button className='text-3xl focus:outline-none' onClick={() => setMenuOpen(!menuOpen)}>
              <i className='fa-solid fa-bars'></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} bg-gray-100 lg:hidden flex flex-col items-center gap-4 p-4 text-[#6E6E6F] text-lg`}>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/'>Cart</NavLink>
          <NavLink to='/'>Products</NavLink>
          <NavLink to='/'>Categories</NavLink>
          <NavLink to='/'>Brands</NavLink>

          <div className='flex gap-3 pt-4'>
            <a href='/'>
              <i className='fa-brands fa-instagram'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-facebook'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-tiktok'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-twitter'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-linkedin'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-youtube'></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
