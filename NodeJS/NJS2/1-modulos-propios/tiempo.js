function horaActual() {
    const ahora = new Date();
    return ahora.toLocaleTimeString();
}

module.exports = horaActual;