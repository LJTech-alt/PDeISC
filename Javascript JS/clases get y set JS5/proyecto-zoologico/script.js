class CZooAnimal {
  constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
    this.IdAnimal = IdAnimal;
    this.nombre = nombre;
    this.JaulaNumero = JaulaNumero;
    this.IdTypeAnimal = IdTypeAnimal;
    this.peso = peso;
  }

  get info() {
    return `ID: ${this.IdAnimal} - ${this.nombre}, Jaula: ${this.JaulaNumero}, Tipo: ${this.IdTypeAnimal}, Peso: ${this.peso}kg`;
  }
}

const zooAnimales = [];

function agregarAnimal() {
  const id = prompt("ID del animal:");
  const nombre = prompt("Nombre del animal:");
  const jaula = prompt("Número de jaula:");
  const tipo = prompt("Tipo de animal (1=Felino, 2=Ave, 3=Reptil):");
  const peso = prompt("Peso (kg):");

  zooAnimales.push(new CZooAnimal(id, nombre, jaula, tipo, peso));
  alert("Animal agregado correctamente.");
}

function mostrarResultados() {
  if (zooAnimales.length === 0) {
    alert("No hay animales cargados.");
    return;
  }

  document.write("<h1>Resultados del Zoológico</h1>");
  document.write("<table border='1' cellpadding='5'><tr><th>ID</th><th>Nombre</th><th>Jaula</th><th>Tipo</th><th>Peso (kg)</th></tr>");
  
  zooAnimales.forEach(animal => {
    document.write(`<tr>
      <td>${animal.IdAnimal}</td>
      <td>${animal.nombre}</td>
      <td>${animal.JaulaNumero}</td>
      <td>${animal.IdTypeAnimal}</td>
      <td>${animal.peso}</td>
    </tr>`);
  });

  document.write("</table>");
}
