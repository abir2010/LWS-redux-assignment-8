import { useGetBooksQuery } from "../../features/api/apiSlice";
import BookslistItem from "./BookslistItem";
import Error from "./../ui/Error";
import NewBookLoader from "./../ui/loaders/NewBookLoader";

export default function Bookslist() {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();

  let content = null;
  if (isLoading)
    content = (
      <>
        <NewBookLoader />
        <NewBookLoader />
        <NewBookLoader />
      </>
    );
  if (!isLoading && isError) content = <Error message={error} />;
  if (!isLoading && !isError && books?.length === 0)
    content = <Error message="No Books list found" />;
  if (!isLoading && !isError && books?.length > 0) {
    content = books.map((book) => <BookslistItem key={book.id} book={book} />);
  }

  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {content}
    </div>
  );
}
 