import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();

      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => prev.map((book) => (book.id === pk ? data : book)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1> Book Storm </h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Release date"
          onChange={(event) => setReleaseYear(event.target.value)}
        />
        <button onClick={addBook}>Add Book</button>

        <h1>Books List</h1>
        {books.map((book) => (
          <div key={book.id}>
            <p>Title: {book.title} </p>
            <p>Release Year: {book.release_year}</p>
            <input
              type="text"
              placeholder="New Title..."
              onChange={(event) => setNewTitle(event.target.value)}
            />
            <button onClick={() => updateTitle(book.id, book.release_year)}>
              Change Title
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
