import { BrowserRouter, Routes, Route } from "react-router-dom";
import Simulator from "./pages/Simulator";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Simulator />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;