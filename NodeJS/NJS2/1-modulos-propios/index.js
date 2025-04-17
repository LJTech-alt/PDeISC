const horaActual = require('./tiempo');
const { sumar, multiplicar } = require('./calculo');

console.log("Hora actual:", horaActual());
console.log("Suma:", sumar(5, 3));
console.log("Multiplicación:", multiplicar(4, 7));