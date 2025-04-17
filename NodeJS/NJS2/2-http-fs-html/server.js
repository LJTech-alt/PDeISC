const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readfile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end("Error al cargar el archivo HTML");
        }
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(data);
            res.end();
    });
}).listen(5500);

console.log("Servidor corriendo en http://localhost:5500");

