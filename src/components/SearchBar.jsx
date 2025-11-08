import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar d-flex flex-column flex-sm-row align-items-sm-center gap-2">
      <input
        type="text"
        placeholder="Buscar por nombre o apellidos"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary w-100 w-sm-auto">
        Buscar
      </button>
    </form>
  );
}
