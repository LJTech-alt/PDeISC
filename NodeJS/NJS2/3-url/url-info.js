const url = require('url');

const direccion = new URL('http://localhost:8080/pagina?nombre=lautaro&edad=18');

console.log("Host:", direccion.host);
console.log("Path:", direccion.pathname);
console.log("Query:", direccion.searchParams.toString());
console.log("Nombre", direccion.searchParams.get("nombre"));