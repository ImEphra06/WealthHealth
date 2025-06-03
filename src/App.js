import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Homepage from "./page/homepage/homepage";
import CreateEmployee from "./page/createEmployee/createEmployee";
import Error from "./page/error/error";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
