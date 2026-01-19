let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const counterCurrent = document.getElementById('current');
const counterTotal = document.getElementById('total');
const counterEl = document.querySelector('.slide-counter');
let hideTimer;

if (counterTotal) {
    counterTotal.innerText = slides.length;
}

function showCounter() {
    if (!counterEl) return;

    counterEl.classList.add('visible');

    if (hideTimer) clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        counterEl.classList.remove('visible');
    }, 3000);
}

function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    currentSlide = index;

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    if (counterCurrent) {
        counterCurrent.innerText = currentSlide + 1;
    }

    showCounter();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    }
    if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

showSlide(0);