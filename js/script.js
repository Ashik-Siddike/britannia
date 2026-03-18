// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Sticky Navbar Background and Shadow on Scroll
const navbar = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
});

// Testimonial Slider logic (Vanilla JS)
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('slide-prev');
const nextBtn = document.getElementById('slide-next');
const dots = document.querySelectorAll('.slide-dot');

let currentSlide = 0;

function showSlide(index) {
  if (slides.length === 0) return;
  
  // Wrap around
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;

  slides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.classList.remove('opacity-0', 'absolute');
      slide.classList.add('opacity-100', 'relative');
      if (dots[i]) {
        dots[i].classList.replace('bg-gray-300', 'bg-britRed');
      }
    } else {
      slide.classList.remove('opacity-100', 'relative');
      slide.classList.add('opacity-0', 'absolute');
      if (dots[i]) {
        dots[i].classList.replace('bg-britRed', 'bg-gray-300');
      }
    }
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
  });
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Initialize first slide
showSlide(currentSlide);

// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }
});

// Parallax text effect
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    
    // Horizontal text parallax
    const parallaxTexts = document.querySelectorAll('.parallax-text');
    parallaxTexts.forEach(el => {
        let speed = parseFloat(el.getAttribute('data-speed')) || 1;
        // Move horizontally based on scroll
        el.style.transform = `translateX(calc(-50% - ${scrollY * speed * 0.1}px))`;
    });
    
    // Vertical image parallax
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    parallaxImgs.forEach(el => {
        let speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
        // Move vertically based on scroll
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});
