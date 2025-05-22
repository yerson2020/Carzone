// Carrusel de imágenes
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let counter = 0;

function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${counter * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    counter = (counter + 1) % carouselImages.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    counter = (counter - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

// Carrusel automático
setInterval(() => {
    counter = (counter + 1) % carouselImages.length;
    updateCarousel();
}, 4000);
