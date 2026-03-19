document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 10, 10, 0.8)';
      nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Optional: animate only once
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));
  
  // Custom cursor follow effect on hero visual
  const heroVisual = document.querySelector('.hero-visual');
  const heroImage = document.querySelector('.hero-visual img');
  const heroGlow = document.querySelector('.hero-glow');
  
  if (heroVisual && heroImage) {
    heroVisual.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroVisual.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      heroImage.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-10px)`;
      heroGlow.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
    
    heroVisual.addEventListener('mouseleave', () => {
      heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
      heroGlow.style.transform = 'translate(0px, 0px)';
    });
  }
});
