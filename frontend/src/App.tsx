import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* You can add more routes later */}
    </Routes>
  );
};

export default App;
