import React, { useState } from "react";
import { postRegistro } from "../api";
import { useNavigate, Link } from "react-router-dom";

const avatars = [
  "https://api.dicebear.com/8.x/miniavs/svg?seed=1",
  "https://api.dicebear.com/8.x/miniavs/svg?seed=2",
  "https://api.dicebear.com/8.x/miniavs/svg?seed=Mia",
  "https://api.dicebear.com/8.x/miniavs/svg?seed=Abby", // Changed to a female avatar option
];

export default function Registro() {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    const data = {
      nombre: form.get("nombre"),
      apellidos: form.get("apellidos"),
      email: form.get("email"),
      twitter: form.get("twitter"),
      ocupacion: form.get("ocupacion"),
      avatar: selectedAvatar,
      acepta: !!form.get("acepta"),
    };

    if (!data.nombre || !data.apellidos || !data.email || !data.acepta) {
      setError("Completa los campos requeridos y acepta términos.");
      return;
    }

    await postRegistro(data);
    nav("/participantes");
  }

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
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center mb-4 text-primary fw-bold">Registro de Participante</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos</label>
                  <input type="text" className="form-control" id="apellidos" name="apellidos" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="twitter" className="form-label">Twitter (opcional)</label>
                  <input type="text" className="form-control" id="twitter" name="twitter" />
                </div>
                <div className="mb-3">
                  <label htmlFor="ocupacion" className="form-label">Ocupación (opcional)</label>
                  <input type="text" className="form-control" id="ocupacion" name="ocupacion" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Avatar</label>
                  <div className="d-flex flex-wrap">
                    {avatars.map((avatar) => (
                      <div key={avatar} className="me-3 mb-2 d-flex flex-column align-items-center">
                        <img
                          src={avatar}
                          alt="Avatar"
                          style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: selectedAvatar === avatar ? '3px solid #0d6efd' : '3px solid #ced4da',
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedAvatar(avatar)}
                        />
                        <input
                          type="radio"
                          name="avatar"
                          id={avatar}
                          value={avatar}
                          checked={selectedAvatar === avatar}
                          onChange={() => setSelectedAvatar(avatar)}
                          className="form-check-input mt-2"
                          style={{ display: 'none' }} /* Hide default radio button */
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="acepta" name="acepta" />
                  <label className="form-check-label" htmlFor="acepta">Acepto términos y condiciones</label>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary btn-lg w-100">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
