let secuencia = [];
let jugador = [];
let ronda = 0;
const colores = ["rojo", "verde", "azul", "amarillo"];

function reproducirSecuencia() {
  let i = 0;
  const intervalo = setInterval(() => {
    const color = secuencia[i];
    iluminar(color);
    i++;
    if (i >= secuencia.length) clearInterval(intervalo);
  }, 600);
}

function iluminar(color) {
  const boton = document.getElementById(color);
  boton.classList.add("activo");
  setTimeout(() => boton.classList.remove("activo"), 300);
}

function agregarColor() {
  const color = colores[Math.floor(Math.random() * colores.length)];
  secuencia.push(color);
  reproducirSecuencia();
}

function manejarClick(color) {
  jugador.push(color);
  iluminar(color);

  const i = jugador.length - 1;
  if (jugador[i] !== secuencia[i]) {
    alert(`¡Fallaste, ${localStorage.getItem("jugador") || "jugador"}! Llegaste a la ronda ${ronda}`);
    guardarPuntaje(localStorage.getItem("jugador"), ronda);
    actualizarTabla();
    secuencia = [];
    jugador = [];
    ronda = 0;
    document.getElementById("ronda").textContent = "Ronda: 0";
    return;
  }

  if (jugador.length === secuencia.length) {
    ronda++;
    jugador = [];
    document.getElementById("ronda").textContent = `Ronda: ${ronda}`;
    setTimeout(agregarColor, 1000);
  }
}

function guardarPuntaje(nombre, puntaje) {
  if (!nombre) return;
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  const jugadorExistente = scores.find(j => j.nombre === nombre);
  if (jugadorExistente) {
    if (puntaje > jugadorExistente.puntaje) {
      jugadorExistente.puntaje = puntaje;
    }
  } else {
    scores.push({ nombre, puntaje });
  }

  scores.sort((a, b) => b.puntaje - a.puntaje);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function actualizarTabla() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const tabla = document.getElementById("tabla-scores");
  tabla.innerHTML = "";
  scores.forEach((j, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${j.nombre} - ${j.puntaje} pts`;
    tabla.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("guardarJugador").onclick = () => {
    const nombre = document.getElementById("jugador").value.trim();
    if (nombre !== "") {
      localStorage.setItem("jugador", nombre);
      document.getElementById("bienvenida").textContent = `¡Bienvenido/a ${nombre}!`;
    }
  };

  document.getElementById("comenzar").onclick = () => {
    if (!localStorage.getItem("jugador")) {
      alert("Por favor, ingresa tu nombre primero.");
      return;
    }
    secuencia = [];
    jugador = [];
    ronda = 1;
    document.getElementById("ronda").textContent = `Ronda: ${ronda}`;
    agregarColor();
  };

  colores.forEach(color => {
    document.getElementById(color).onclick = () => manejarClick(color);
  });

  const nombreGuardado = localStorage.getItem("jugador");
  if (nombreGuardado) {
    document.getElementById("bienvenida").textContent = `¡Bienvenido/a ${nombreGuardado}!`;
  }

  actualizarTabla();
});
