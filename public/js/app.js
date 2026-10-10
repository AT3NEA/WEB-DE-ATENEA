document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. EFECTO DE SONIDO NATIVO GLOBAL (WEB AUDIO API)
    // ==========================================
    function reproducirSonidoClick() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine'; 
            osc.frequency.setValueAtTime(500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {
            // Manejo silencioso por políticas del navegador
        }
    }

    // Delegación de eventos global: Detecta clics en CUALQUIER botón o enlace del sitio
    document.addEventListener('click', (e) => {
        const elementoInteractivo = e.target.closest('button, a, .btn-filtro, .carrusel-btn, .btn-tema, .btn-ver-proyecto');
        
        if (elementoInteractivo) {
            reproducirSonidoClick();

            // Si es un enlace interno que cambia de página (ej. Proyectos, Sobre mí, Detalle)
            const href = elementoInteractivo.getAttribute('href');
            const targetAttr = elementoInteractivo.getAttribute('target');
            
            if (href && !href.startsWith('#') && !href.startsWith('javascript') && !targetAttr && elementoInteractivo.tagName === 'A') {
                e.preventDefault(); // Pausa un instante la navegación para que se alcance a escuchar el sonido
                setTimeout(() => {
                    window.location.href = href;
                }, 60); // 60ms (imperceptible para el humano, pero suficiente para reproducir el audio)
            }
        }
    });

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

        if (inputBusqueda) {
            inputBusqueda.addEventListener('input', aplicarFiltros);
        }
    }

    // ==========================================
    // 3. CARRUSEL DE IMÁGENES (INDEX)
    // ==========================================
    const track = document.getElementById('carruselTrack');
    const slides = document.querySelectorAll('.carrusel-slide');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (track && slides.length > 0 && btnPrev && btnNext) {
        let currentIndex = 0;

        function actualizarCarrusel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            actualizarCarrusel();
        });

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            actualizarCarrusel();
        });
    }

    // ==========================================
    // 4. COPIAR CORREO EN PÁGINA DE CONTACTO
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

    // ==========================================
    // 5. INTRO CINEMATOGRÁFICA (SPLASH SCREEN)
    // ==========================================
    const introSplash = document.getElementById('introSplash');
    if (introSplash) {
        if (sessionStorage.getItem('introVista')) {
            introSplash.style.display = 'none';
        } else {
            setTimeout(() => {
                introSplash.classList.add('ocultar');
                setTimeout(() => {
                    introSplash.style.display = 'none';
                    sessionStorage.setItem('introVista', 'true');
                }, 800);
            }, 2000);
        }
    }
});