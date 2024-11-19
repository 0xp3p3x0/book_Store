// pages/books.tsx
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Book {
  title: string;
  description: string;
  cover: string;
}

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const fetchBooks = useCallback(async () => {
    const { data } = await axios.get(`/api/books?page=${page}`);
    setBooks(data.books);
  }, [page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Books List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {books.map((book) => (
          <div key={book.title} className="border p-4 rounded shadow-lg">
            <img src={book.cover} alt={book.title} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-xl">{book.title}</h2>
            <p className="text-sm">{book.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded mr-2">Previous</button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)} className="px-4 py-2 bg-gray-300 rounded ml-2">Next</button>
      </div>
    </div>
  );
};

export default BooksList;
