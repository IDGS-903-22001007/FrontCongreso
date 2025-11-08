import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchParticipante } from '../api';
import utlLogo from "/utl.png";

export default function Gafete() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipante(id).then(d => {
      setP(d);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Cargando gafete...</p>;
  if (!p) return <p className="text-center mt-5">No se encontró participante.</p>;

  const nombre = `${p.nombre} ${p.apellidos}`;

  return (
    <div className="container mt-5">
      <style>
        {`
          .gafete-container {
            min-height: 80vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at top left, #e0e0e0, #c0c0c0); /* Subtle radial gradient */
            padding: 20px 0;
            overflow: hidden; /* Ensure no overflow from shadows */
          }
          .flip-card {
            background-color: transparent;
            width: 380px; /* Slightly larger for impact */
            height: 580px; /* Taller for more content space */
            perspective: 1200px; /* Deeper perspective */
            margin: auto;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother, more dramatic transition */
            transform-style: preserve-3d;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.2); /* Layered, deeper shadow */
            border-radius: 20px; /* More rounded for a modern feel */
            background: #ffffff; /* Default background for inner */
          }

          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Distribute content */
            align-items: center;
            padding: 30px;
            box-sizing: border-box;
            border: 1px solid rgba(255,255,255,0.1); /* Subtle inner border */
          }

          .flip-card-front {
            background: linear-gradient(145deg, #1a2a6c, #b21f1f, #fdbb2d); /* Rich, dynamic gradient */
            color: #ffffff;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5); /* Inner shadow for depth */
          }

          .flip-card-back {
            background: linear-gradient(145deg, #fdfbfb, #ebedee); /* Clean, subtle gradient */
            color: #333333;
            transform: rotateY(180deg);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1); /* Inner shadow */
          }

          .gafete-header-front {
            width: 100%;
            text-align: center;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2); /* Subtle separator */
          }

          .gafete-header-front img {
            height: 50px;
            filter: drop-shadow(0 0 5px rgba(0,0,0,0.5)); /* Glow effect */
          }

          .gafete-avatar {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            object-fit: cover;
            border: 6px solid rgba(255,255,255,0.9); /* Prominent white border */
            box-shadow: 0 8px 20px rgba(0,0,0,0.4); /* Stronger avatar shadow */
            margin-bottom: 25px;
            margin-top: 20px;
          }

          .gafete-name {
            font-size: 2.8rem; /* Even larger name */
            font-weight: 800;
            margin-bottom: 8px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.4); /* Deeper text shadow */
            letter-spacing: 1px;
          }

          .gafete-ocupacion {
            font-size: 1.5rem;
            font-weight: 500;
            opacity: 0.95;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          .gafete-twitter {
            font-size: 1.2rem;
            color: #fdbb2d; /* Gold accent for Twitter */
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .gafete-twitter:hover {
            color: #ffdd77; /* Lighter gold on hover */
            text-decoration: underline;
          }

          .gafete-info-section {
            width: 100%;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .gafete-info-title {
            font-size: 1.8rem;
            color: #1a2a6c; /* Deep blue for titles */
            margin-bottom: 20px;
            font-weight: 700;
            text-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          .gafete-info-item {
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: #555555;
          }

          .gafete-info-item strong {
            color: #333333;
          }

          .gafete-footer-back {
            width: 100%;
            text-align: center;
            padding-top: 15px;
            border-top: 1px solid rgba(0,0,0,0.1); /* Subtle separator */
          }

          .gafete-footer-back img {
            height: 40px;
            filter: drop-shadow(0 0 3px rgba(0,0,0,0.2));
          }
        `}
      </style>

      <div className="gafete-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="gafete-header-front">
                <img src={utlLogo} alt="UTL Logo" />
              </div>
              <img src={p.avatar || '/vite.svg'} alt={nombre} className="gafete-avatar" />
              <h2 className="gafete-name">{nombre}</h2>
              <p className="gafete-ocupacion">{p.ocupacion}</p>
              <a href={`https://twitter.com/${p.twitter}`} target="_blank" rel="noopener noreferrer" className="gafete-twitter">@{p.twitter}</a>
            </div>
            <div className="flip-card-back">
              <div className="gafete-header-front">
                <img src={utlLogo} alt="UTL Logo" />
              </div>
              <div className="gafete-info-section">
                <h3 className="gafete-info-title">Información Adicional</h3>
                <p className="gafete-info-item"><strong>Email:</strong> {p.email}</p>
                <p className="gafete-info-item"><strong>Registrado:</strong> {new Date(p.creadoEn).toLocaleString()}</p>
              </div>
              <div className="gafete-footer-back">
                <img src={utlLogo} alt="UTL Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to="/participantes" className="btn btn-primary btn-lg">Volver a la lista</Link>
      </div>
    </div>
  );
}

