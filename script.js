// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// Set current date
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('ru-RU');

// Chart.js default configuration with Telegram colors
Chart.defaults.color = '#1e293b';
Chart.defaults.font.family = 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Telegram color palette
const telegramColors = {
    primary: '#0088cc',
    secondary: '#229ED9',
    light: '#54a9eb',
    lighter: '#5bb4f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    white: '#ffffff',
    gray: '#64748b'
};

// Common chart options
const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 25,
                usePointStyle: true,
                font: {
                    size: 13,
                    weight: '500'
                },
                color: '#475569'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1e293b',
            bodyColor: '#475569',
            borderColor: '#0088cc',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 15,
            titleFont: {
                size: 14,
                weight: '600'
            },
            bodyFont: {
                size: 13
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(8, 136, 204, 0.1)',
                borderColor: 'rgba(8, 136, 204, 0.2)'
            },
            ticks: {
                color: '#64748b',
                font: {
                    size: 12
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(8, 136, 204, 0.1)',
                borderColor: 'rgba(8, 136, 204, 0.2)'
            },
            ticks: {
                color: '#64748b',
                font: {
                    size: 12
                }
            }
        }
    }
};

// Gradient function for Telegram style
function createTelegramGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// Budget Distribution Chart
const budgetCtx = document.getElementById('budgetChart').getContext('2d');
const budgetGradient1 = createTelegramGradient(budgetCtx, telegramColors.primary, telegramColors.secondary);
const budgetGradient2 = createTelegramGradient(budgetCtx, telegramColors.light, telegramColors.lighter);
const budgetGradient3 = createTelegramGradient(budgetCtx, telegramColors.success, '#059669');

new Chart(budgetCtx, {
    type: 'doughnut',
    data: {
        labels: ['Поиск', 'РСЯ', 'Мастер-кампания'],
        datasets: [{
            data: [18300, 15600, 16400],
            backgroundColor: [budgetGradient1, budgetGradient2, budgetGradient3],
            borderColor: telegramColors.white,
            borderWidth: 3,
            hoverBorderWidth: 4,
            cutout: '60%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 25,
                    usePointStyle: true,
                    font: {
                        size: 13,
                        weight: '500'
                    },
                    color: '#475569'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#0088cc',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 15,
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed.toLocaleString('ru-RU')}₽ (${percentage}%)`;
                    }
                }
            }
        }
    }
});

// CTR Chart
const ctrCtx = document.getElementById('ctrChart').getContext('2d');
new Chart(ctrCtx, {
    type: 'bar',
    data: {
        labels: ['Мастер-кампания', 'РСЯ', 'Поиск'],
        datasets: [{
            label: 'CTR (%)',
            data: [2.55, 1.67, 0.27],
            backgroundColor: [
                createTelegramGradient(ctrCtx, telegramColors.success, '#059669'),
                createTelegramGradient(ctrCtx, telegramColors.warning, '#d97706'),
                createTelegramGradient(ctrCtx, telegramColors.danger, '#dc2626')
            ],
            borderColor: telegramColors.white,
            borderWidth: 2,
            borderRadius: 12,
            borderSkipped: false
        }]
    },
    options: {
        ...commonOptions,
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                beginAtZero: true,
                ticks: {
                    ...commonOptions.scales.y.ticks,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            ...commonOptions.plugins,
            tooltip: {
                ...commonOptions.plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        }
    }
});

// Conversions Chart
const conversionsCtx = document.getElementById('conversionsChart').getContext('2d');
new Chart(conversionsCtx, {
    type: 'bar',
    data: {
        labels: ['Мастер-кампания', 'Поиск', 'РСЯ'],
        datasets: [{
            label: 'Конверсии',
            data: [162, 43, 29],
            backgroundColor: createTelegramGradient(conversionsCtx, telegramColors.primary, telegramColors.secondary),
            borderColor: telegramColors.white,
            borderWidth: 2,
            borderRadius: 12,
            borderSkipped: false
        }]
    },
    options: {
        ...commonOptions,
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                beginAtZero: true
            }
        }
    }
});

// CPA Chart
const cpaCtx = document.getElementById('cpaChart').getContext('2d');
new Chart(cpaCtx, {
    type: 'bar',
    data: {
        labels: ['Мастер-кампания', 'Поиск', 'РСЯ'],
        datasets: [{
            label: 'CPA (₽)',
            data: [101, 426, 538],
            backgroundColor: [
                createTelegramGradient(cpaCtx, telegramColors.success, '#059669'),
                createTelegramGradient(cpaCtx, telegramColors.warning, '#d97706'),
                createTelegramGradient(cpaCtx, telegramColors.danger, '#dc2626')
            ],
            borderColor: telegramColors.white,
            borderWidth: 2,
            borderRadius: 12,
            borderSkipped: false
        }]
    },
    options: {
        ...commonOptions,
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                beginAtZero: true,
                ticks: {
                    ...commonOptions.scales.y.ticks,
                    callback: function(value) {
                        return value + '₽';
                    }
                }
            }
        },
        plugins: {
            ...commonOptions.plugins,
            tooltip: {
                ...commonOptions.plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}₽`;
                    }
                }
            }
        }
    }
});

// Gender Distribution Chart
const genderCtx = document.getElementById('genderChart').getContext('2d');
new Chart(genderCtx, {
    type: 'doughnut',
    data: {
        labels: ['Женщины', 'Мужчины', 'Неизвестно'],
        datasets: [{
            data: [54, 44, 2],
            backgroundColor: [
                createTelegramGradient(genderCtx, '#ec4899', '#be185d'),
                createTelegramGradient(genderCtx, telegramColors.info, '#1d4ed8'),
                createTelegramGradient(genderCtx, '#6b7280', '#374151')
            ],
            borderColor: telegramColors.white,
            borderWidth: 3,
            cutout: '50%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 25,
                    usePointStyle: true,
                    font: {
                        size: 13,
                        weight: '500'
                    },
                    color: '#475569'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#0088cc',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 15,
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    }
});

// Age Groups Chart
const ageCtx = document.getElementById('ageChart').getContext('2d');
new Chart(ageCtx, {
    type: 'bar',
    data: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
            label: 'Доля аудитории (%)',
            data: [4, 8, 14, 17, 56],
            backgroundColor: [
                createTelegramGradient(ageCtx, telegramColors.light, telegramColors.lighter),
                createTelegramGradient(ageCtx, telegramColors.secondary, telegramColors.light),
                createTelegramGradient(ageCtx, telegramColors.primary, telegramColors.secondary),
                createTelegramGradient(ageCtx, '#1e40af', telegramColors.primary),
                createTelegramGradient(ageCtx, '#1e3a8a', '#1e40af')
            ],
            borderColor: telegramColors.white,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
        }]
    },
    options: {
        ...commonOptions,
        scales: {
            ...commonOptions.scales,
            y: {
                ...commonOptions.scales.y,
                beginAtZero: true,
                ticks: {
                    ...commonOptions.scales.y.ticks,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            ...commonOptions.plugins,
            tooltip: {
                ...commonOptions.plugins.tooltip,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        }
    }
});

// Smooth scroll for navigation
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.campaign-card, .chart-container, .insight-card, .demo-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Chart loading animation
function addChartLoadingAnimation() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container, index) => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
            canvas.style.opacity = '0';
            canvas.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                canvas.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                canvas.style.opacity = '1';
                canvas.style.transform = 'scale(1)';
            }, index * 200);
        }
    });
}

// Stat cards animation
function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        const value = card.querySelector('.stat-value');
        if (value) {
            const finalValue = value.textContent;
            const numericValue = parseFloat(finalValue.replace(/[^\d.,]/g, '').replace(',', '.'));
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (finalValue.includes('₽')) {
                        value.textContent = Math.round(current).toLocaleString('ru-RU') + '₽';
                    } else if (finalValue.includes('%')) {
                        value.textContent = current.toFixed(2) + '%';
                    } else {
                        value.textContent = Math.round(current);
                    }
                }, 30);
            }
        }
    });
}

// Initialize chart animations when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        addChartLoadingAnimation();
        animateStatCards();
    }, 1000);
});

// Intersection observer for progressive animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special animation for charts
            if (entry.target.classList.contains('chart-container')) {
                const canvas = entry.target.querySelector('canvas');
                if (canvas) {
                    setTimeout(() => {
                        canvas.style.opacity = '1';
                        canvas.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.stat-card, .campaign-card, .chart-container, .insight-card, .demo-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .stat-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(8, 136, 204, 0.25);
    }
    
    .campaign-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .insight-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .chart-container {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .demo-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    /* Telegram-style pulse animation for important elements */
    .best-performer {
        animation: telegramPulse 2s infinite;
    }
    
    @keyframes telegramPulse {
        0% {
            box-shadow: 0 15px 40px rgba(8, 136, 204, 0.25);
        }
        50% {
            box-shadow: 0 15px 40px rgba(8, 136, 204, 0.4);
        }
        100% {
            box-shadow: 0 15px 40px rgba(8, 136, 204, 0.25);
        }
    }
    
    /* Telegram-style loading spinner */
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(8, 136, 204, 0.3);
        border-top: 2px solid #0088cc;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance metrics display
function displayPerformanceMetrics() {
    const performanceData = {
        totalSpend: 50300,
        totalConversions: 234,
        averageCPA: 215,
        averageCTR: 1.59,
        conversionRate: 0.85
    };
    
    console.log('📊 Твой Телеграм - Отчет загружен:', performanceData);
}

// Initialize performance tracking
window.addEventListener('load', displayPerformanceMetrics);