const jugadorInput = document.getElementById("jugador");
const guardarBtn = document.getElementById("guardar");
const bienvenida = document.getElementById("bienvenida");
const areaJuego = document.getElementById("area-juego");
const resultadoDiv = document.getElementById("resultado");
const rankingUl = document.getElementById("ranking");
const btnReiniciar = document.getElementById("btn-reiniciar");

const opciones = ["piedra", "papel", "tijeras"];
let nombreJugador = "";
let racha = 0;
let mejorRacha = JSON.parse(localStorage.getItem("ppt-rank")) || [];
let bloqueado = false;

function guardarJugador() {
  const nombre = jugadorInput.value.trim();
  if (!nombre) return;
  nombreJugador = nombre;
  localStorage.setItem("ppt-jugador", nombreJugador);
  bienvenida.textContent = `¡Bienvenido/a ${nombreJugador}!`;
  areaJuego.classList.remove("oculto");
  actualizarRanking();
}

function jugar(eleccionJugador) {
  if (bloqueado) return;

  const eleccionCPU = opciones[Math.floor(Math.random() * 3)];
  bloqueado = true;

  resetSeleccion();
  document.getElementById("cpu-" + eleccionCPU).classList.add("seleccionado");
  document.querySelector(`.jugador-btn[data-opcion="${eleccionJugador}"]`).classList.add("seleccionado");

  let resultado = "";

  if (eleccionJugador === eleccionCPU) {
    resultado = `Empate 🤝 (${eleccionJugador})`;
  } else if (
    (eleccionJugador === "piedra" && eleccionCPU === "tijeras") ||
    (eleccionJugador === "papel" && eleccionCPU === "piedra") ||
    (eleccionJugador === "tijeras" && eleccionCPU === "papel")
  ) {
    resultado = `¡Ganaste! 🎉 (${eleccionJugador} vs ${eleccionCPU})`;
    racha++;
    guardarRacha(nombreJugador, racha);
  } else {
    resultado = `Perdiste 😞 (${eleccionJugador} vs ${eleccionCPU})`;
    racha = 0;
  }

  resultadoDiv.textContent = resultado;
  resultadoDiv.classList.remove("oculto");
  btnReiniciar.classList.remove("oculto");
  actualizarRanking();
}

function guardarRacha(nombre, nuevaRacha) {
  const jugador = mejorRacha.find(p => p.nombre === nombre);
  if (jugador) {
    if (nuevaRacha > jugador.racha) jugador.racha = nuevaRacha;
  } else {
    mejorRacha.push({ nombre, racha: nuevaRacha });
  }
  mejorRacha.sort((a, b) => b.racha - a.racha);
  localStorage.setItem("ppt-rank", JSON.stringify(mejorRacha));
}

function actualizarRanking() {
  rankingUl.innerHTML = "";
  mejorRacha.forEach((j, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${j.nombre}: ${j.racha} victorias seguidas`;
    rankingUl.appendChild(li);
  });
}

function resetSeleccion() {
  document.querySelectorAll(".opcion").forEach(op => op.classList.remove("seleccionado"));
}

btnReiniciar.addEventListener("click", () => {
  bloqueado = false;
  resultadoDiv.classList.add("oculto");
  btnReiniciar.classList.add("oculto");
  resetSeleccion();
});

document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("ppt-jugador");
  if (guardado) {
    nombreJugador = guardado;
    jugadorInput.value = nombreJugador;
    bienvenida.textContent = `¡Bienvenido/a ${nombreJugador}!`;
    areaJuego.classList.remove("oculto");
  }

  document.querySelectorAll(".jugador-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      jugar(btn.dataset.opcion);
    });
  });

  guardarBtn.addEventListener("click", guardarJugador);
  actualizarRanking();
});
