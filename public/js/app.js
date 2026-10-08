/* ===================================================
   ATENEA - LÓGICA DE INTERFAZ Y CARRUSEL
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DEL MODO OSCURO / CLARO ---
    const btnTema = document.getElementById('btnTema');
    
    if (localStorage.getItem('tema') === 'claro') {
        document.body.classList.add('modo-claro');
        if (btnTema) btnTema.textContent = 'Modo Oscuro';
    } else {
        if (btnTema) btnTema.textContent = 'Modo Claro';
    }

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('modo-claro');
            const esClaro = document.body.classList.contains('modo-claro');
            
            localStorage.setItem('tema', esClaro ? 'claro' : 'oscuro');
            btnTema.textContent = esClaro ? 'Modo Oscuro' : 'Modo Claro';
        });
    }

    // --- 2. LÓGICA DEL CARRUSEL (index.html) ---
    const track = document.getElementById('carruselTrack');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (track && btnPrev && btnNext) {
        const slides = document.querySelectorAll('.carrusel-slide');
        let index = 0;

        const moverCarrusel = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        const avanzar = () => {
            index = (index < slides.length - 1) ? index + 1 : 0;
            moverCarrusel();
        };

        const retroceder = () => {
            index = (index > 0) ? index - 1 : slides.length - 1;
            moverCarrusel();
        };

        btnNext.addEventListener('click', avanzar);
        btnPrev.addEventListener('click', retroceder);

        // Auto-play cada 4 segundos
        setInterval(avanzar, 4000);
    }
});

// --- 3. LÓGICA DE FILTROS Y BÚSQUEDA (proyectos.html) ---
    const btnFiltros = document.querySelectorAll('.btn-filtro');
    const proyectosCards = document.querySelectorAll('.proyecto-card');
    const inputBuscar = document.getElementById('inputBuscar');

    // Lógica para los botones de categorías
    if (btnFiltros.length > 0 && proyectosCards.length > 0) {
        btnFiltros.forEach(btn => {
            btn.addEventListener('click', () => {
                // Quitar estilo activo a todos y ponérselo al cliqueado
                btnFiltros.forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                const categoriaSeleccionada = btn.getAttribute('data-categoria');

                // Mostrar/Ocultar tarjetas
                proyectosCards.forEach(tarjeta => {
                    if (categoriaSeleccionada === 'todos' || tarjeta.getAttribute('data-categoria') === categoriaSeleccionada) {
                        tarjeta.style.display = 'flex'; // Muestra la tarjeta
                    } else {
                        tarjeta.style.display = 'none'; // Oculta la tarjeta
                    }
                });
            });
        });
    }

    // Lógica para el buscador por texto
    if (inputBuscar) {
        inputBuscar.addEventListener('keyup', (e) => {
            const textoBusqueda = e.target.value.toLowerCase();
            
            proyectosCards.forEach(tarjeta => {
                // Busca el título dentro del h3 de cada tarjeta
                const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
                
                if (titulo.includes(textoBusqueda)) {
                    tarjeta.style.display = 'flex';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    }


    // --- 4. LÓGICA DE COPIAR CORREO (contacto.html) ---
    const btnCopiar = document.getElementById('btnCopiarCorreo');
    if (btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            navigator.clipboard.writeText('seiter320@gmail.com');
            const textoOriginal = btnCopiar.textContent;
            btnCopiar.textContent = '¡Copiado al portapapeles! ✅';
            btnCopiar.style.borderColor = 'var(--acento)';
            btnCopiar.style.color = 'var(--acento)';
            
            setTimeout(() => {
                btnCopiar.textContent = textoOriginal;
                btnCopiar.style.borderColor = 'var(--borde)';
                btnCopiar.style.color = 'var(--texto-secundario)';
            }, 2000);
        });
    }