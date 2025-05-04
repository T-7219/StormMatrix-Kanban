/**
 * Расширенные настройки для аналитики и отслеживания пользователей
 * StormMatrix Kanban
 */

// Подготовка dataLayer для Google Tag Manager
window.dataLayer = window.dataLayer || [];

// Вспомогательная функция для работы с GTM
function gtag() {
    dataLayer.push(arguments);
}

// Отправка события просмотра страницы
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // ID измерения Google Analytics

// Отслеживание событий взаимодействия пользователей
document.addEventListener('DOMContentLoaded', function() {
    // Отслеживание скроллинга страницы
    let scrollDepthTriggered = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

        // Отслеживаем глубину прокрутки
        Object.keys(scrollDepthTriggered).forEach(function(depth) {
            if (scrollPercent >= depth && !scrollDepthTriggered[depth]) {
                scrollDepthTriggered[depth] = true;
                gtag('event', 'scroll_depth', {
                    'depth': depth + '%',
                    'page': window.location.pathname
                });
            }
        });
    });

    // Отслеживание времени на странице
    let timeOnPage = 0;
    const timeIntervals = [10, 30, 60, 120, 300]; // секунды
    const timeTracker = setInterval(function() {
        timeOnPage++;
        if (timeIntervals.includes(timeOnPage)) {
            gtag('event', 'time_on_page', {
                'duration': timeOnPage + 's',
                'page': window.location.pathname
            });
        }
    }, 1000);

    // Отслеживание кликов по важным элементам
    const trackElements = document.querySelectorAll('a.btn, .navbar-nav a, .footer-links a, button.btn-primary');
    trackElements.forEach(function(element) {
        element.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href') || '';
            
            gtag('event', 'click', {
                'event_category': 'engagement',
                'event_label': linkText,
                'link_url': linkHref,
                'page': window.location.pathname
            });
        });
    });

    // Отслеживание заполнения форм
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        // Отслеживание начала заполнения формы
        const formInputs = form.querySelectorAll('input, textarea, select');
        let formStarted = false;
        
        formInputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                if (!formStarted) {
                    formStarted = true;
                    gtag('event', 'form_start', {
                        'form_id': form.id || 'unknown_form',
                        'page': window.location.pathname
                    });
                }
            });
        });

        // Отслеживание отправки формы
        form.addEventListener('submit', function() {
            gtag('event', 'form_submit', {
                'form_id': form.id || 'unknown_form',
                'page': window.location.pathname
            });
        });
    });
});

// Интеграция с пикселем Facebook
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '0000000000000000'); // ID пикселя Facebook
fbq('track', 'PageView');