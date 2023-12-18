import "./App.css";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
