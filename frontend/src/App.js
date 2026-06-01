import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BladeePage from "./components/BladeePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BladeePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
