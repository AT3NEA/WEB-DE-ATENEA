const contenedorGaleria = document.querySelector('#galeria-proyectos');

function cargarProyectos() {
  if (!misProyectos || misProyectos.length === 0) {
    contenedorGaleria.innerHTML = '<p>No hay proyectos para mostrar.</p>';
    return;
  }

  // Recorremos el arreglo y construimos el HTML de cada tarjeta
  misProyectos.forEach(proyecto => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta';

    tarjeta.innerHTML = `
      <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
      <div class="tarjeta-cuerpo">
        <span class="etiqueta">${proyecto.categoria}</span>
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
        <div class="botones">
          ${proyecto.enlaceVideo ? `<a href="${proyecto.enlaceVideo}" target="_blank" class="btn btn-principal">Ver Demo</a>` : ''}
          ${proyecto.enlaceDescarga ? `<a href="${proyecto.enlaceDescarga}" class="btn btn-secundario">Descargar</a>` : ''}
        </div>
      </div>
    `;

    contenedorGaleria.appendChild(tarjeta);
  });
}

// Ejecutamos la función al cargar la página
cargarProyectos();