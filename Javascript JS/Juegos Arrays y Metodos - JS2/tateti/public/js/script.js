const tablero = document.getElementById("tablero");
const info = document.getElementById("info");
const puntajesUl = document.getElementById("puntajes");

let jugadorActual = "X";
let celdas = Array(9).fill(null);
let nombres = { X: "", O: "" };
let puntajes = JSON.parse(localStorage.getItem("tateti-scores")) || [];

function crearTablero() {
  tablero.innerHTML = "";
  celdas = Array(9).fill(null);
  for (let i = 0; i < 9; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.dataset.index = i;
    celda.onclick = () => manejarMovimiento(i, celda);
    tablero.appendChild(celda);
  }
  tablero.classList.remove("oculto");
  actualizarInfo();
}

function manejarMovimiento(index, celda) {
  if (celdas[index] || verificarGanador()) return;
  celdas[index] = jugadorActual;
  celda.textContent = jugadorActual;

  if (verificarGanador()) {
    alert(`Ganó ${nombres[jugadorActual]} (${jugadorActual})`);
    guardarPuntaje(nombres[jugadorActual]);
    actualizarPuntajes();
    tablero.classList.add("oculto");
  } else if (celdas.every(c => c)) {
    alert("¡Empate!");
    tablero.classList.add("oculto");
  } else {
    jugadorActual = jugadorActual === "X" ? "O" : "X";
    actualizarInfo();
  }
}

function actualizarInfo() {
  info.textContent = `Turno de: ${nombres[jugadorActual]} (${jugadorActual})`;
}

function verificarGanador() {
  const combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return combinaciones.some(comb =>
    comb.every(i => celdas[i] === jugadorActual)
  );
}

function guardarPuntaje(nombre) {
  if (!nombre) return;
  const existente = puntajes.find(p => p.nombre === nombre);
  if (existente) {
    existente.puntaje++;
  } else {
    puntajes.push({ nombre, puntaje: 1 });
  }
  puntajes.sort((a, b) => b.puntaje - a.puntaje);
  localStorage.setItem("tateti-scores", JSON.stringify(puntajes));
}

function actualizarPuntajes() {
  puntajesUl.innerHTML = "";
  puntajes.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre}: ${p.puntaje} pts`;
    puntajesUl.appendChild(li);
  });
}

document.getElementById("iniciar").onclick = () => {
  const nombreX = document.getElementById("jugadorX").value.trim();
  const nombreO = document.getElementById("jugadorO").value.trim();

  if (!nombreX || !nombreO) {
    alert("Ingresá ambos nombres.");
    return;
  }

  nombres.X = nombreX;
  nombres.O = nombreO;
  jugadorActual = "X";
  crearTablero();
};

actualizarPuntajes();
