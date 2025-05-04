// Скрипты для работы одностраничного сайта

document.addEventListener("DOMContentLoaded", function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Изменение стиля навигационной панели при прокрутке
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Инициализация всех тултипов
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Добавление класса анимации для элементов
    const animateElements = document.querySelectorAll('.hero-image, .architecture-diagram img');
    animateElements.forEach(element => {
        element.classList.add('animate-float');
    });

    // Анимация элементов при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .feature-card, .use-case-card, .architecture-card, .doc-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Проверяем, находится ли элемент в области видимости
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Установка начальных стилей для элементов с анимацией
    const setupAnimationElements = function() {
        const elements = document.querySelectorAll('.benefit-card, .feature-card, .use-case-card, .architecture-card, .doc-card');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };

    // Инициализация анимаций
    setupAnimationElements();
    window.addEventListener('scroll', animateOnScroll);
    // Запуск функции один раз при загрузке, чтобы активировать элементы, которые уже в области видимости
    animateOnScroll();

    // Валидация форм
    const validateForms = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                let isValid = true;
                
                // Проверка заполненности полей
                const requiredFields = form.querySelectorAll('input[required], textarea[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });
                
                // Проверка email
                const emailFields = form.querySelectorAll('input[type="email"]');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                emailFields.forEach(field => {
                    if (field.value.trim() && !emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    }
                });
                
                // Отмена отправки формы при наличии ошибок
                if (!isValid) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Имитация отправки формы для демонстрации
                    event.preventDefault();
                    
                    // Показываем сообщение об успешной отправке
                    const submitBtn = form.querySelector('[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправка...';
                    
                    setTimeout(() => {
                        form.innerHTML = '<div class="text-center"><i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i><h4 class="mt-3">Успешно отправлено!</h4><p>Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.</p></div>';
                    }, 1500);
                }
            });
            
            // Удаление класса ошибки при вводе
            const inputFields = form.querySelectorAll('input, textarea');
            inputFields.forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('is-invalid');
                });
            });
        });
    };
    
    validateForms();
});