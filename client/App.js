import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./client/src/Login.jsx";
import Home from "./client/src/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;