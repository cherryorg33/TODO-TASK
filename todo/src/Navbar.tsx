import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`p-4 ${isScrolled ? 'bg-blue-500' : 'bg-transparent'} fixed w-full z-10 transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Todo Task</div>
        <div className="block lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
          <ul className="lg:flex lg:justify-between text-white">
            <li className="block mt-4 lg:inline-block lg:mt-0 lg:ml-6">
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li className="block mt-4 lg:inline-block lg:mt-0 lg:ml-6">
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li className="block mt-4 lg:inline-block lg:mt-0 lg:ml-6">
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
