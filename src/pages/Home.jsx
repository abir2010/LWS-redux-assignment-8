import Bookslist from "./../components/books/Bookslist";
import Topbar from "./../components/topbar/Topbar";

export default function Home() {
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <Topbar />
        <Bookslist />
      </div>
    </main>
  );
}
