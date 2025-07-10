const archivoInput = document.getElementById("archivo");
const procesarBtn = document.getElementById("procesar");
const guardarBtn = document.getElementById("guardar");
const resultado = document.getElementById("resultado");
const listaValidos = document.getElementById("lista-validos");
const totalValidosEl = document.getElementById("total-validos");
const totalInvalidosEl = document.getElementById("total-invalidos");
const porcentajeEl = document.getElementById("porcentaje");

let validos = [];

procesarBtn.addEventListener("click", () => {
    const archivo = archivoInput.files[0];
    if (!archivo) {
        alert("Selecciona un archivo .txt primero.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const contenido = e.target.result;
        const lineas = contenido.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        validos = [];
        let invalidos = 0;

        for (let numero of lineas) {
            if (/^\d+$/.test(numero)) {
                if (numero[0] === numero[numero.length - 1]) {
                    validos.push(parseInt(numero));
                } else {
                    invalidos++;
                }
            }
        }

        validos.sort((a, b) => a - b);
        listaValidos.innerHTML = "";
        validos.forEach(n => {
            const li = document.createElement("li");
            li.textContent = n;
            listaValidos.appendChild(li);
        });
         
        totalValidosEl.textContent = validos.length;
        totalInvalidosEl.textContent = invalidos;
        const porcentaje = ((validos.length / (validos.length + invalidos)) * 100).toFixed(2);
        porcentajeEl.textContent = isNaN(porcentaje) ? 0 : porcentaje;

        resultado.classList.remove("hidden");
    };

    reader.readAsText(archivo);
});

guardarBtn.addEventListener("click", () => {
    const contenido = validos.join("\n");
    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resultado-filtrado.txt";
    a.click();

    URL.revokeObjectURL(url);
});