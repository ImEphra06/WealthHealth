import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Homepage from "./page/homepage/homepage";
import CreateEmployee from "./page/createEmployee/createEmployee";
import ListEmployees from "./page/listEmployees/listEmployees";
import Error from "./page/error/error";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/list" element={<ListEmployees />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
