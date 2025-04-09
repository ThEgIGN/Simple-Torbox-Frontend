import "./App.css"
import "./components/FontAwesomeIcons"
import Home from "./pages/Home"
import AddTorrent from "./pages/AddTorrent";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from 'sonner'

function App() {
  return (
    <div>
      <Toaster theme="dark" position="bottom-center" richColors/>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/add" element={< AddTorrent />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
