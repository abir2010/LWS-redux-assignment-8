import Bookslist from "./../components/books/Bookslist";
import Topbar from "./../components/topbar/Topbar";
import Navbar from "./../components/navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("All");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <Topbar tag={tag} setTag={setTag} />
          <Bookslist search={search} tag={tag} />
        </div>
      </main>
    </>
  );
}
