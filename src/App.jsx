import "./App.css"
import Home from "./pages/Home"
import AddTorrent from "./pages/AddTorrent";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={< AddTorrent />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
