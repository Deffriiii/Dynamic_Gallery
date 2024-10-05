// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import PhotoDetail from './components/PhotoDetail'; // Import komponen detail gambar
import './App.css';

const categories = ['home', 'nature', 'city', 'technology', 'food'];

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State untuk kata kunci pencarian
  const [isDarkMode, setIsDarkMode] = useState(false); // State untuk tema gelap

  const handleCategorySelect = () => {
    setSearchTerm(''); // Mengatur searchTerm ke kosong saat kategori dipilih
  };

  // Fungsi untuk toggle tema gelap
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar 
          categories={categories} 
          onSearch={setSearchTerm} 
          onCategorySelect={handleCategorySelect} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} // Kirim toggleTheme ke Navbar
        />
        <Routes>
          {categories.map((category) => (
            <Route
              key={category}
              path={`/${category === 'home' ? '' : category}`}
              element={<Gallery category={category} searchTerm={searchTerm} />} // Kirim searchTerm ke Gallery
            />
          ))}
          <Route path="/photo/:id" element={<PhotoDetail />} /> {/* Rute untuk detail foto */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
