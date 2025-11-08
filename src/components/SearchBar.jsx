import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    onSearch(q);
  }, [q, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por nombre, email o ocupación"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </div>
  );
}
