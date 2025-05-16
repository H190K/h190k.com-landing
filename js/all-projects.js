import { initStorePopup } from './popup-utils.js';
import { projects } from './projects.js';

// Initialize all projects on page load with enhanced animations
window.addEventListener('DOMContentLoaded', () => {
  initStorePopup();
  const grid = document.getElementById('projects-grid');
  
  if (grid) {
    // Get animation variables from CSS
    const styles = getComputedStyle(document.documentElement);
    const animDuration = styles.getPropertyValue('--animation-duration').trim() || '0.8s';
    const animEasing = styles.getPropertyValue('--animation-easing').trim() || 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
    
    projects.forEach((p, index) => {
      grid.insertAdjacentHTML('beforeend', `
        <div class="project-card" style="animation-delay: ${index * 0.1}s">
          <div class="project-image">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
          </div>
          <div class="project-content">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <button class="btn-secondary" onclick="window.open('${p.link}','_blank')">
              ${p.button || 'View Project'}
            </button>
          </div>
        </div>
      `);
    });
    
    // Add scroll animations for elements that enter viewport
    const animateOnScroll = () => {
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)';
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      cards.forEach(card => observer.observe(card));
    };
    
    // Initialize scroll animations
    animateOnScroll();
  }
});

// Burger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  if (burger && navLinks) {
    // Click handler
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      document.body.classList.toggle('menu-open');
      burger.classList.toggle('toggle');
      
      // Animate nav items
      document.querySelectorAll('.nav-links li').forEach((link, i) => {
        link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${i/7+0.3}s`;
      });
    });
    
    // Keyboard accessibility
    burger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burger.click();
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('nav-active')) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.burger')) {
          navLinks.classList.remove('nav-active');
          document.body.classList.remove('menu-open');
          burger.classList.remove('toggle');
          document.querySelectorAll('.nav-links li').forEach(l => l.style.animation = '');
        }
      }
    });
  }
});
