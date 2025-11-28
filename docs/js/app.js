// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // ==========
    // SELECTORES
    // ==========
    const body = document.body;
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const scrollLinks = document.querySelectorAll('a[href^="#"].js-scroll');
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const faq = document.querySelector('.faq');
    const themeToggleBtn = document.querySelector('.theme-toggle');

    const citaForm = document.querySelector('.cita-form');
    const nombreInput = document.getElementById('nombre');
    const mascotaInput = document.getElementById('mascota');
    const telefonoInput = document.getElementById('telefono');
    const motivoSelect = document.getElementById('motivo');
    const formMessage = document.querySelector('.form-message');
    const citaTexto = document.getElementById('cita-texto');

    // ===================
    // MENÚ MÓVIL (HAMB)
    // ===================
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });

        // Cerrar menú al hacer clic en un link
        scrollLinks.forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-open');
            });
        });
    }

    // ==========================
    // SCROLL SUAVE EN NAV LINKS
    // ==========================
    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // RESALTAR SECCIÓN ACTIVA EN EL MENÚ
    // ===================================
    const navLinks = document.querySelectorAll('.nav-links a.js-scroll');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href') || '';
                        if (href === `#${id}`) {
                            link.classList.add('is-active');
                        } else {
                            link.classList.remove('is-active');
                        }
                    });
                }
            });
        }, {
            root: null,
            threshold: 0.5
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // ======================================
    // ANIMACIONES AL HACER SCROLL (REVEAL)
    // ======================================
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target); // Animar solo una vez
                }
            });
        }, {
            root: null,
            threshold: 0.2
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: mostrar todo si el navegador no soporta IntersectionObserver
        revealElements.forEach(el => el.classList.add('reveal-visible'));
    }

    // =========================
    // BOTÓN "VOLVER ARRIBA"
    // =========================
    const toggleBackToTop = () => {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            document.getElementById('top')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // ===================
    // FAQ (ACORDEÓN SIMPLE)
    // ===================
    if (faq) {
        const questionBtn = faq.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                faq.classList.toggle('open');
            });
        }
    }

    // =================================
    // TEMA CLARO/OSCURO CON LOCALSTORAGE
    // =================================
    const THEME_KEY = 'vetbq_theme';

    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'light' ? 'Modo oscuro' : 'Modo claro';
        }
    };

    // Cargar tema guardado
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
        applyTheme(storedTheme);
    } else {
        applyTheme('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(current);
            localStorage.setItem(THEME_KEY, current);
        });
    }

    // =====================================
    // VALIDACIÓN DE FORMULARIO DE CITA
    // =====================================
    const CITA_KEY = 'vetbq_ultima_cita';

    // Mostrar mensaje si ya se pidió cita hoy
    const checkExistingAppointment = () => {
        const stored = localStorage.getItem(CITA_KEY);
        if (!stored) return;

        try {
            const previousDate = new Date(stored);
            const now = new Date();
            const sameDay =
                previousDate.getFullYear() === now.getFullYear() &&
                previousDate.getMonth() === now.getMonth() &&
                previousDate.getDate() === now.getDate();

            if (sameDay && citaTexto) {
                citaTexto.textContent = 'Ya recibimos una solicitud tuya hoy. Si necesitas otra cita, por favor indícalo en el mensaje.';
            }
        } catch (e) {
            // Si falla el parseo, se ignora
        }
    };

    checkExistingAppointment();

    const clearFieldError = (field) => {
        field.classList.remove('field-error');
    };

    const setFieldError = (field) => {
        field.classList.add('field-error');
    };

    const resetFormErrors = () => {
        [nombreInput, mascotaInput, telefonoInput, motivoSelect].forEach(clearFieldError);
        if (formMessage) {
            formMessage.textContent = '';
            formMessage.classList.remove('error', 'success');
        }
    };

    const validateForm = () => {
        let isValid = true;
        resetFormErrors();

        if (!nombreInput.value.trim() || nombreInput.value.trim().length < 3) {
            setFieldError(nombreInput);
            isValid = false;
        }

        if (!mascotaInput.value.trim() || mascotaInput.value.trim().length < 2) {
            setFieldError(mascotaInput);
            isValid = false;
        }

        const telefono = telefonoInput.value.trim();
        const telefonoPattern = /^[0-9\s+()-]{7,}$/;
        if (!telefonoPattern.test(telefono)) {
            setFieldError(telefonoInput);
            isValid = false;
        }

        if (!motivoSelect.value) {
            setFieldError(motivoSelect);
            isValid = false;
        }

        if (!isValid && formMessage) {
            formMessage.textContent = 'Por favor revisa los campos marcados en rojo.';
            formMessage.classList.add('error');
        }

        return isValid;
    };

    if (citaForm) {
        citaForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            // Simular envío
            if (formMessage) {
                formMessage.textContent = 'Enviando tu solicitud...';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
            }

            // Simulación de envío al "servidor"
            setTimeout(() => {
                if (formMessage) {
                    formMessage.textContent = '¡Gracias! Hemos recibido tu solicitud, te contactaremos por WhatsApp.';
                }
                citaForm.reset();
                // Guardar la fecha de la última solicitud
                localStorage.setItem(CITA_KEY, new Date().toISOString());
                checkExistingAppointment();
            }, 900);
        });

        // Limpiar errores mientras el usuario escribe
        [nombreInput, mascotaInput, telefonoInput, motivoSelect].forEach(field => {
            field.addEventListener('input', () => {
                clearFieldError(field);
                if (formMessage && formMessage.classList.contains('error')) {
                    formMessage.textContent = '';
                    formMessage.classList.remove('error');
                }
            });
        });
    }

    // =========================================
    // PEQUEÑA INTERACCIÓN EN TARJETAS PROMOCIÓN
    // =========================================
    const promoCards = document.querySelectorAll('.promo-card');

    promoCards.forEach(card => {
        const originalTitle = card.querySelector('h3')?.textContent || '';
        const tag = card.getAttribute('data-promo-tag') || '';

        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('h3');
            if (title && tag) {
                title.textContent = `👀 ${tag} disponible`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('h3');
            if (title && originalTitle) {
                title.textContent = originalTitle;
            }
        });
    });
});
