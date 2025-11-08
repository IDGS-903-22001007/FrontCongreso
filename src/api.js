const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchListado(q) {
  const url = q ? `${API}/api/listado?q=${encodeURIComponent(q)}` : `${API}/api/listado`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener el listado");
  return res.json();
}

export async function fetchParticipante(id) {
  const res = await fetch(`${API}/api/participante/${id}`);
  if (!res.ok) throw new Error("Participante no encontrado");
  return res.json();
}

export async function postRegistro(data) {
  const res = await fetch(`${API}/api/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al registrar participante");
  return res.json();
}
