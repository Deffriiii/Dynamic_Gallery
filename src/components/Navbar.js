import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ categories, onSearch, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false); // State untuk toggle menu

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Panggil fungsi onSearch saat formulir disubmit
    setSearchTerm(''); // Kosongkan input setelah pencarian
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(); // Kosongkan search term saat kategori dipilih
    setIsActive(false); // Menutup menu setelah kategori diklik
  };

  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle state untuk menu
  };

  return (
    <nav className={`navbar ${isActive ? 'active' : ''}`}>
      {/* Link ke halaman home saat logo diklik */}
      <Link to="/" className="logo" onClick={() => setIsActive(false)}>
        Dynamic <span>Gallery</span>
      </Link>

      {/* Hamburger Menu */}
      {!isActive ? (
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        // Close Button
        <div className="close-btn" onClick={toggleMenu}>
          &#10005; {/* Unicode untuk simbol 'X' */}
        </div>
      )}

      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/${category === 'home' ? '' : category}`} onClick={() => handleCategoryClick(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Photos"
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
