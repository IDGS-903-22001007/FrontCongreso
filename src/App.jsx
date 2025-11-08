import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Participantes from "./pages/Participantes";
import Registro from "./pages/Registro";
import Gafete from "./pages/Gafete";
import "./App.css";

export default function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/participantes" element={<Participantes />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/gafete/:id" element={<Gafete />} />
        </Routes>
      </main>
    </div>
  );
}
