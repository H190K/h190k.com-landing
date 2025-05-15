import projects from './projects.js';
import { card } from './utils.js';

// Initialize all projects on page load with enhanced animations
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');
  
  if (grid) {
    // Get animation variables from CSS
    const styles = getComputedStyle(document.documentElement);
    const animDuration = styles.getPropertyValue('--animation-duration').trim() || '0.8s';
    const animEasing = styles.getPropertyValue('--animation-easing').trim() || 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
    
    // Add projects to the grid
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
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
      
      cards.forEach(card => observer.observe(card));
    };
    
    // Initialize scroll animations
    animateOnScroll();
  }
});
