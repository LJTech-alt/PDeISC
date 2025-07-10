const numeros = [];
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const guardarBtn = document.getElementById("guardar");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("numero");
    const valor = parseInt(input.value.trim());

    if(isNaN(valor)) {
        mensaje.textContent = "Debes ingresar un numero valido.";
        return;
    }

    if (numeros.length >= 20) {
        mensaje.textContent = "Ya has ingresado el maximo de 20 numeros.";
        return;
    }

    numeros.push(valor);
    mensaje.textContent = `has ingresado ${numeros.length} número(s).`;
    const item = document.createElement("li");
    item.textContent = valor;
    lista.appendChild(item);
    input.value = "";

    if (numeros.length >= 10) {
        guardarBtn.disabled = false;
    }
});

guardarBtn.addEventListener("click", () => {
    const contenido = numeros.join("\n");
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "numeros.txt";
    a.click();

    URL.revokeObjectURL(url);
});