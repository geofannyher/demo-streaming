import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<h1 className="text-center font-bold">Template Example</h1>}
        />
        Í
      </Routes>
    </BrowserRouter>
  );
}

export default App;
