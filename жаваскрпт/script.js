document.addEventListener('DOMContentLoaded', function() {
    initGrowthChart();
    initScrollAnimations();
    initSmoothNavigation();
    initInteractiveElements();
    initAdModal();
    initTypingEffect();
});

// --- ФУНКЦИЯ МОДАЛЬНОГО ОКНА (ФИНАЛЬНАЯ ВЕРСИЯ) ---
function initAdModal() {
    const modal = document.getElementById('adModal');
    const modalButton = document.getElementById('adModalButton');

    if (!modal || !modalButton) return;

    let hasModalBeenShown = false;

    const showModal = () => {
        if (!hasModalBeenShown) {
            modal.style.display = 'flex';
            hasModalBeenShown = true;
        }
    };

    const hideModal = () => {
        modal.style.display = 'none';
    };
    
    modalButton.addEventListener('click', () => {
        window.open('https://e-school.obr.lenreg.ru', '_blank');
        hideModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= pageHeight - 100) {
            showModal();
        }
    });
}

// Эффект печатания для заголовка
function initTypingEffect() {
    const titleElement = document.getElementById('main-title');
    if (!titleElement) return;
    
    const text = titleElement.innerText;
    titleElement.innerText = '';
    let index = 0;

    const type = () => {
        if (index < text.length) {
            titleElement.innerText += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    };
    setTimeout(type, 500);
}

// График роста интернета
function initGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1995', '2000', '2005', '2010', '2015', '2020', '2023'],
            datasets: [{
                label: 'Количество пользователей (млрд)',
                data: [0.016, 0.361, 1.018, 1.970, 3.185, 4.540, 5.160],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 14, family: "'Open Sans', sans-serif" },
                        color: '#2c3e50'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' млрд';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: function(value) { return value + ' млрд'; } }
                }
            },
            animation: { duration: 2000, easing: 'easeInOutQuart' }
        }
    });
}

// Анимации при прокрутке
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.classList.contains('stat-card') && !entry.target.classList.contains('animated')) {
                    const numberElement = entry.target.querySelector('h4');
                    if (numberElement) {
                        animateNumber(numberElement);
                        entry.target.classList.add('animated');
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .person-card, .era-section, .stat-card, .resource-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Анимация чисел
function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (element.textContent.includes('%')) {
            element.textContent = current.toFixed(1) + '%';
        } else if (element.textContent.includes('млрд')) {
            element.textContent = current.toFixed(2) + ' млрд';
        } else {
            element.textContent = current.toFixed(2) + ' млрд';
        }
    }, 16);
}

// Плавная навигация
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// Интерактивные элементы
function initInteractiveElements() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        border-radius: 50%; background: #3498db; color: white; border: none;
        font-size: 20px; cursor: pointer; opacity: 0; visibility: hidden;
        transition: all 0.3s ease; z-index: 999; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}