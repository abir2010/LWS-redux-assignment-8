import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useGetBookQuery,
} from "../../features/api/apiSlice";
import Error from "./../ui/Error";
import NewBookLoader from "./../ui/loaders/NewBookLoader";
import { useEffect, useState } from "react";
import Success from "../ui/Success";

export default function EditForm() {
  const [editBook, { isSuccess }] = useEditBookMutation();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [featured, setFeatured] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookQuery(params.bookId);

  let content = null;
  if (isLoading)
    content = (
      <>
        <NewBookLoader />
      </>
    );
  if (!isLoading && isError)
    content = <Error message="There was an error getting book information" />;
  if (!isLoading && !isError && book?.id) {
    content = book;
  }

  const reset = () => {
    setName("");
    setAuthor("");
    setThumbnail("");
    setPrice("");
    setRating("");
    setFeatured(false);
  };

  useEffect(() => {
    setName(content.name || "");
    setAuthor(content.author || "");
    setThumbnail(content.thumbnail || "");
    setPrice(content.price || "");
    setRating(content.rating || "");
    setFeatured(content.featured || false);
  }, [content]);

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      name,
      author,
      thumbnail,
      price: parseFloat(price),
      rating: parseInt(rating),
      featured,
    };
    const id = content.id;

    editBook({ id, data });

    reset();
    navigate("/");
  };

  return (
    <>
      {!isLoading && !isError ? (
        <form onSubmit={handleEdit} className="book-form">
          <div className="space-y-2">
            <label htmlFor="lws-bookName">Book Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-input"
              type="text"
              id="lws-bookName"
              name="name"
              placeholder="React Handbook"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lws-author">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="text-input"
              type="text"
              id="lws-author"
              name="author"
              placeholder="Jonathon Atkinson"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lws-thumbnail">Image Url</label>
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
              className="text-input"
              type="text"
              id="lws-thumbnail"
              name="thumbnail"
              placeholder="www.unsplash.com/book.jpg"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="space-y-2">
              <label htmlFor="lws-price">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="text-input"
                type="number"
                id="lws-price"
                name="price"
                placeholder="9.99"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lws-rating">Rating</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="text-input"
                type="number"
                id="lws-rating"
                name="rating"
                min={1}
                max={5}
                placeholder="5"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              id="lws-featured"
              type="checkbox"
              name="featured"
              className="w-4 h-4"
            />
            <label htmlFor="lws-featured" className="ml-2 text-sm">
              {" "}
              This is a featured book{" "}
            </label>
          </div>
          <button type="submit" className="submit" id="lws-submit">
            Edit Book
          </button>
          {isSuccess && (
            <Success message="Book information Edited successfully" />
          )}
        </form>
      ) : (
        content
      )}
    </>
  );
}
