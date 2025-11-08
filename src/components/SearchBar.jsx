import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar d-flex">
      <input
        type="text"
        placeholder="Buscar por nombre o apellidos"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="form-control me-2"
      />
      <button type="submit" className="btn btn-primary">Buscar</button>
    </form>
  );
}
