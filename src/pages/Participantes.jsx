import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchListado } from "../api";
import ParticipanteCard from "../components/ParticipanteCard";
import SearchBar from "../components/SearchBar";

export default function Participantes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const list = await fetchListado(q);
      setItems(list);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      setItems([]); // Clear items on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/utl.png" alt="UTL Logo" style={{ height: '30px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/participantes">Participantes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Listado de Participantes</h2>
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-stretch align-items-md-center gap-3 my-4 p-3 bg-light rounded shadow-sm">
          <SearchBar onSearch={load} />
          <Link to="/registro" className="btn btn-primary btn-lg flex-shrink-0">
            Registrar
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No hay participantes registrados.</p>
        ) : (
          <div className="grid">
            {items.map((p) => (
              <ParticipanteCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
