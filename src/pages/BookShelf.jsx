// src/components/Bookshelf.js
import React, { useState, useEffect } from 'react';
import './bookSearch.css'

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBooks);
  }, []);

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className='container'>
      <h1 className='title'>My Bookshelf</h1>
      <button onClick={() => window.location.href = '/'} className='button'>Back to Search</button>
      {bookshelf.length === 0 ? (
        <p>No books in the bookshelf.</p>
      ) : 
      (
        <div className="card-container">
          {
            bookshelf.map((book, index) => (
              <div key={index} className="book-card">
                <h2 className='book-card-title'>{book.title}</h2>
                <p className='book-card-author'>{book.author_name?.join(', ')}</p>
                <button onClick={() => removeFromBookshelf(book)} className='button'>Remove from Bookshelf</button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
