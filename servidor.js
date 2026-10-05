const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const servidor = http.createServer((peticion, respuesta) => {
  // Si la ruta es '/', cargamos index.html por defecto
  let url = peticion.url === '/' ? '/index.html' : peticion.url;
  const rutaArchivo = path.join(__dirname, 'public', url);

  fs.readFile(rutaArchivo, (error, contenido) => {
    if (error) {
      respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      respuesta.end('404 - Archivo no encontrado');
      return;
    }

    // Detectamos el tipo de archivo según la extensión
    let tipo = 'text/html; charset=utf-8';
    if (url.endsWith('.css')) tipo = 'text/css; charset=utf-8';
    if (url.endsWith('.js')) tipo = 'text/javascript; charset=utf-8';
    if (url.endsWith('.png')) tipo = 'image/png';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) tipo = 'image/jpeg';

    respuesta.writeHead(200, { 'Content-Type': tipo });
    respuesta.end(contenido);
  });
});

servidor.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});