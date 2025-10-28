document.addEventListener('DOMContentLoaded', (event) => {

    // --- 1. LÓGICA DO LOADER (2s) ---
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar'); 

    if (loader && loaderBar) {
        setTimeout(() => {
            loader.classList.add('loading-animation');
            
            setTimeout(() => {
                loader.classList.add('hidden'); 
                
                setTimeout(() => {
                    if(loader) {
                        loader.remove();
                    }
                }, 700); // AJUSTADO: Fade-out do loader mais rápido (0.7s)

            }, 1800); // AJUSTADO: Tempo total da barra + buffer (1.8s)

        }, 100); 
    }
    

    // --- 2. LÓGICA DO HEADER "SCROLLED" ---
    const header = document.getElementById('main-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. LÓGICA DE ANIMAÇÃO AO ROLAR (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1 
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

});




/* ------------------------------------------
/* SCRIPT CARROSSEL CLIENTES (Novo - Modo Central)
/* ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIÇÃO DOS DADOS ---
    const TOTAL_SLIDES = 18; // Total de 18 slides
    
    // ATUALIZADO: Lista com as 18 descrições narrativas por cliente
    const descricoes = [
        // Projeto 1: Loja FF (Imagens 1-8)
        "Loja FF: Recepção com balcão em acabamento dourado escovado.", // 1.jpg
        "Loja FF: Corredor de entrada com arcos e iluminação embutida.", // 2.jpg
        "Loja FF: Provador com puff em capitonê e cortinas de veludo.", // 3.jpg
        "Loja FF: Lavabo com bancada branca esculpida e espelho clássico.", // 4.jpg
        "Loja FF: Detalhe do box com vidro fosco e acabamentos minimalistas.", // 5.jpg
        "Loja FF: Salão amplo com piso em parquet e teto em tom verde-água.", // 6.jpg
        "Loja FF: Área de provadores com iluminação dedicada e espelhos amplos.", // 7.jpg
        "Loja FF: Espaço de exposição de roupas com vista para a vitrine.", // 8.jpg
        
        // Projeto 2: Beauty Club (Imagens 9-12)
        "Beauty Club: Lounge com tijolinho aparente e iluminação industrial.", // 9.jpg
        "Beauty Club: Espaço barbearia com cadeira vintage e marcenaria rústica.", // 10.jpg
        "Beauty Club: Sala de espera com sofá Chesterfield e parede container.", // 11.jpg
        "Beauty Club: Salão com estações de trabalho e iluminação técnica em trilhos.", // 12.jpg

        // Projeto 3: Clínica INOR (Imagens 13-18)
        "Clínica INOR: Recepção principal com balcão em mármore e logo.", // 13.jpg
        "Clínica INOR: Consultório acessível com marcenaria planejada em cinza.", // 14.jpg
        "Clínica INOR: Corredor de espera com design clean e cadeiras modernas.", // 15.jpg
        "Clínica INOR: Detalhe da fachada em painel perfurado e rampa de acesso.", // 16.jpg
        "Clínica INOR: Acesso principal com porta de vidro e guarda-corpo metálico.", // 17.jpg
        "Clínica INOR: Fachada noturna com projeto de iluminação linear e de destaque." // 18.jpg
    ];

    // --- 2. SELEÇÃO DOS ELEMENTOS ---
    const viewport = document.querySelector('.clientes-viewport');
    const track = document.getElementById('clientes-track');
    const descEl = document.getElementById('cliente-descricao-texto');
    const nextBtn = document.getElementById('clientes-next');
    const prevBtn = document.getElementById('clientes-prev');

    if (!viewport || !track || !descEl || !nextBtn || !prevBtn) {
        console.warn('Elementos do carrossel de clientes não encontrados.');
        return;
    }

    // --- 3. INICIALIZAÇÃO E MÉTRICAS ---
    let currentIndex = 0;
    let transitionTimer;
    let isTransitioning = false;

    let slideWidth = 0;
    let trackGap = 0;
    let centerOffset = 0; 

    function recalculateCarouselMetrics() {
        const firstSlide = track.querySelector('.cliente-slide');
        if (!firstSlide) return;

        const viewportWidth = viewport.offsetWidth;
        slideWidth = firstSlide.offsetWidth; 
        
        const trackStyle = window.getComputedStyle(track);
        trackGap = parseFloat(trackStyle.gap) || 0;
        
        centerOffset = (viewportWidth - slideWidth) / 2;
    }

    // Função para gerar os slides
    function setupCarousel() {
        let slidesHTML = '';
        
        for (let i = 0; i < TOTAL_SLIDES; i++) {
            // Adiciona a descrição no 'alt' da imagem para acessibilidade
            slidesHTML += `
                <div class="cliente-slide" data-index="${i}">
                    <img src="carrossel/${i + 1}.jpg" alt="${descricoes[i]}">
                </div>
            `;
        }
        track.innerHTML = slidesHTML;
        
        recalculateCarouselMetrics();
        
        updateSlide(0, 'instant');
        startAutoplay();
    }

    // Função principal que move o carrossel
    function updateSlide(newIndex, speed = 'normal') {
        if (isTransitioning && speed !== 'instant') return;
        isTransitioning = true;

        if (newIndex < 0) {
            newIndex = TOTAL_SLIDES - 1;
        } else if (newIndex >= TOTAL_SLIDES) {
            newIndex = 0;
        }
        currentIndex = newIndex;

        const totalTranslate = centerOffset - (currentIndex * (slideWidth + trackGap));

        track.style.transition = (speed === 'instant') ? 'none' : `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
        track.style.transform = `translateX(${totalTranslate}px)`;

        descEl.style.opacity = 0;
        setTimeout(() => {
            descEl.textContent = descricoes[currentIndex];
            descEl.style.opacity = 1;
        }, 350); 

        const allSlides = track.children;
        for (let i = 0; i < allSlides.length; i++) {
            const slide = allSlides[i];
            const slideIndex = parseInt(slide.dataset.index, 10);
            
            slide.classList.toggle('is-active', slideIndex === currentIndex);
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 700);
    }


    // --- 4. CONTROLES E AUTOPLAY ---

    function next() {
        updateSlide(currentIndex + 1);
        resetAutoplay();
    }

    function prev() {
        updateSlide(currentIndex - 1);
        resetAutoplay();
    }

    function startAutoplay() {
        clearInterval(transitionTimer); 
        transitionTimer = setInterval(() => {
            updateSlide(currentIndex + 1);
        }, 4000); // Muda a cada 4 segundos
    }

    function resetAutoplay() {
        clearInterval(transitionTimer);
        startAutoplay();
    }

    // --- 5. EVENT LISTENERS ---
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    
    const carouselWrapper = document.querySelector('.clientes-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(transitionTimer));
        carouselWrapper.addEventListener('mouseleave', startAutoplay);
    }

    window.addEventListener('resize', () => {
        recalculateCarouselMetrics(); 
        updateSlide(currentIndex, 'instant');
    });

    // Iniciar!
    setupCarousel();

});