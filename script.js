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
    updateMenuState(currentSlide);

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

/* --- MENU LOGIC --- */
const menuToggle = document.getElementById('menuToggle');
const slideNavMenu = document.getElementById('slideNavMenu');
const closeMenu = document.getElementById('closeMenu');
const menuItemsContainer = document.getElementById('menuItemsContainer');

function initMenu() {
    if (!menuItemsContainer) return;

    slides.forEach((slide, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = `menu-item ${index === currentSlide ? 'active' : ''}`;
        menuItem.onclick = () => {
            showSlide(index);
            // Optional: Close menu on selection
            // slideNavMenu.classList.remove('active');
        };

        // Construct image path: assets/previews/slide-{index+1}.png
        // Fallback or error handling for images is tricky in pure JS without testing, 
        // using a placeholder if image fails would be good but keeping it simple for now.
        const img = document.createElement('img');
        img.src = `assets/previews/slide-${index + 1}.png`;
        img.alt = `Slide ${index + 1}`;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x169/0a0f1d/00e1ff?text=Slide+' + (index + 1);
            this.style.opacity = '0.5';
        };

        const info = document.createElement('div');
        info.className = 'menu-item-info';
        info.innerText = `Slide ${index + 1}`;

        menuItem.appendChild(img);
        menuItem.appendChild(info);
        menuItemsContainer.appendChild(menuItem);
    });
}

function updateMenuState(index) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            item.classList.remove('active');
        }
    });
}

if (menuToggle && slideNavMenu && closeMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing by the document click listener
        slideNavMenu.classList.toggle('active');
    });

    closeMenu.addEventListener('click', () => {
        slideNavMenu.classList.remove('active');
    });

    // Close when clicking or touching outside content
    const closeMenuOutside = (e) => {
        if (!slideNavMenu.contains(e.target) && !menuToggle.contains(e.target) && slideNavMenu.classList.contains('active')) {
            slideNavMenu.classList.remove('active');
        }
    };
    
    document.addEventListener('click', closeMenuOutside);
    document.addEventListener('touchstart', closeMenuOutside); // Add touch support for mobile
}

initMenu();

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