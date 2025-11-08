import React from "react";
import { Link } from "react-router-dom";

export default function ParticipanteCard({ p }) {
  const nombre = `${p.nombre} ${p.apellidos}`;
  return (
    <div className="card">
      <Link to={`/gafete/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          className="avatar"
          src={p.avatar || "/vite.svg"}
          alt={nombre}
        />
        <h3>{nombre}</h3>
        <p>{p.ocupacion}</p>
      </Link>
      <a href={`https://twitter.com/${p.twitter}`} target="_blank" rel="noopener noreferrer">@{p.twitter}</a>
    </div>
  );
}
