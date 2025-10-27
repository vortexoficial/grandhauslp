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