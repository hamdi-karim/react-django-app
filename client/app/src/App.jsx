import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();

      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <h1> Book Storm </h1>

      <div>
        <input type="text" placeholder="Title" />
        <input type="number" placeholder="Release date" />
        <button>Add Book</button>

        <h1>Books List</h1>
        {books.map((book) => (
          <div key={book.id}>
            <p>Title: {book.title} </p>
            <p>Release Year: {book.release_year}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
