import TodoList from "./pages/todo-list/index.jsx";
import RandomQuote from "./pages/random-quote/index.jsx";
import Home from "./pages/Home/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/random-quote" element={<RandomQuote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
