document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CAMBIO DE TEMA (MODO CLARO / OSCURO)
    // ==========================================
    const btnTema = document.getElementById('btnTema');
    if (btnTema) {
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado === 'claro') {
            document.body.classList.add('modo-claro');
            btnTema.textContent = 'Modo Oscuro';
        }

        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('modo-claro');
            const esClaro = document.body.classList.contains('modo-claro');
            btnTema.textContent = esClaro ? 'Modo Oscuro' : 'Modo Claro';
            localStorage.setItem('tema', esClaro ? 'claro' : 'oscuro');
        });
    }

    // ==========================================
    // 2. BÚSQUEDA Y FILTROS EN PROYECTOS
    // ==========================================
    const inputBusqueda = document.querySelector('.input-busqueda-sidebar');
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const tarjetasProyectos = document.querySelectorAll('.proyecto-card, .tarjeta-item');

    if (tarjetasProyectos.length > 0) {
        let filtroActivo = 'todos';

        function aplicarFiltros() {
            const textoBusqueda = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';

            tarjetasProyectos.forEach(tarjeta => {
                const categoria = tarjeta.getAttribute('data-categoria') || '';
                const contenidoTexto = tarjeta.innerText.toLowerCase();

                const coincideCategoria = (filtroActivo === 'todos') || (categoria === filtroActivo);
                const coincideBusqueda = (textoBusqueda === '') || contenidoTexto.includes(textoBusqueda);

                if (coincideCategoria && coincideBusqueda) {
                    tarjeta.classList.remove('oculto');
                } else {
                    tarjeta.classList.add('oculto');
                }
            });
        }

        // Evento de clics en los botones de categoría
        botonesFiltro.forEach(btn => {
            btn.addEventListener('click', () => {
                botonesFiltro.forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                const textoBtn = btn.innerText.toLowerCase();
                if (textoBtn.includes('programaci')) {
                    filtroActivo = 'programacion';
                } else if (textoBtn.includes('animaci') || textoBtn.includes('3d') || textoBtn.includes('blender')) {
                    filtroActivo = 'animacion';
                } else {
                    filtroActivo = 'todos';
                }

                aplicarFiltros();
            });
        });

        // Evento al escribir en la barra de búsqueda
        if (inputBusqueda) {
            inputBusqueda.addEventListener('input', aplicarFiltros);
        }
    }

    // ==========================================
    // 3. COPIAR CORREO EN PÁGINA DE CONTACTO
    // ==========================================
    const btnCopiar = document.getElementById('btnCopiarCorreo');
    if (btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            navigator.clipboard.writeText('seiter320@gmail.com').then(() => {
                const textoOriginal = btnCopiar.innerText;
                btnCopiar.innerText = '¡Copiado! ✅';
                setTimeout(() => {
                    btnCopiar.innerText = textoOriginal;
                }, 2000);
            });
        });
    }
});