// src/components/BookSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookSearch.css'

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
          setResults(response.data.docs);
        } catch (error) {
          console.error('Error fetching the books:', error);
        }
      };
      fetchBooks();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className='container'>
      <h1 className='title'>Book Search</h1>
      <input 
        className='search'
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a book..." 
      />
      <button onClick={() => window.location.href = '/bookshelf'} className='button'>Go to My Bookshelf</button>
      <div className='card-container'>
        {results.map((book) => (
          <div key={book.key} className="book-card">
            <h2 className='book-card-title'>{book.title}</h2>
            <p className='book-card-author'>{book.author_name?.join(', ')}</p>
            <button onClick={() => addToBookshelf(book)} className='button'>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
