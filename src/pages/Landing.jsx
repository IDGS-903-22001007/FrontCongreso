import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-5 bg-white rounded shadow-lg">
        <div className="mb-4 d-flex justify-content-center align-items-center">
          <img src="/utl.png" alt="UTL Logo" style={{ height: '90px', marginRight: '30px' }} />
          <img src="/congreso.png" alt="Congreso TICs Logo" style={{ height: '90px' }} />
        </div>
        <h1 className="display-2 fw-bolder text-primary mb-3">Congreso TICs</h1>
        <p className="lead mb-5 text-secondary">Bienvenido al evento más grande de Tecnologías de la Información.</p>
        <button className="btn btn-primary btn-lg px-5 py-3 shadow" type="button" onClick={() => nav("/participantes")}>Entrar</button>
      </div>
    </div>
  );
}
