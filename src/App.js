import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Contacts from "./Contacts";
import ContactDetails from "./ContactDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
}

export default App;