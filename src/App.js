// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import Bookshelf from './pages/BookShelf';

const App = () => {
  const [bookshelf, setBookshelf] = useState(JSON.parse(localStorage.getItem('bookshelf')) || []);

  const addToBookshelf = (book) => {
    const newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookSearch addToBookshelf={addToBookshelf} />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

