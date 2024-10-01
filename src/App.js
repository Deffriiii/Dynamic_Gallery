import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import './App.css';

const categories = ['home', 'nature', 'city', 'technology', 'food'];

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State untuk kata kunci pencarian

  const handleCategorySelect = () => {
    setSearchTerm(''); // Mengatur searchTerm ke kosong saat kategori dipilih
  };

  return (
    <Router>
      <div className="App">
        <Navbar categories={categories} onSearch={setSearchTerm} onCategorySelect={handleCategorySelect} />
        <Routes>
          {categories.map((category) => (
            <Route
              key={category}
              path={`/${category === 'home' ? '' : category}`}
              element={<Gallery category={category} searchTerm={searchTerm} />} // Kirim searchTerm ke Gallery
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
  