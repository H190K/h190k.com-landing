import { getFeaturedProjects, projects } from './projects.js';
import config from './config.js';
import { initStorePopup } from './popup-utils.js';

window.config = config;

// Initialize project cards for the homepage
export function initProjects() {
  const featured = getFeaturedProjects();
  const grid = document.getElementById('projects-grid');
  
  if (grid) {
    featured.forEach(p => {
      grid.insertAdjacentHTML('beforeend', `
        <div class="project-card">
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
    
    if (projects.length > featured.length) {
      document.getElementById('view-all-wrapper').innerHTML =
        '<a href="all-projects.html" class="btn-secondary" ' +
        'style="display:inline-block;width:auto;padding:12px 35px;">' +
        'View All Projects</a>';
    }
  }
}

// Main page initialization
window.onload = function () {
  // EmailJS init
  if (window.config?.emailjs) {
    emailjs.init(window.config.emailjs.publicKey);
  }

  // Initialize projects if we're on the homepage
  initProjects();
  
  // Initialize store popup
  initStorePopup();

  // Initialize menu state
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  });

  // Burger menu toggle
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
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
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('nav-active')) {
      if (!e.target.closest('.nav-links') && !e.target.closest('.burger')) {
        navLinks.classList.remove('nav-active');
        document.body.classList.remove('menu-open');
        burger.classList.remove('toggle');
        document.querySelectorAll('.nav-links li').forEach(l => l.style.animation = '');
      }
    }
  });

  // Smooth scroll nav
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').startsWith('#')) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  });

  // Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY>100);
    }
  });

  // Form submission
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-message');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const { serviceID, templateID } = window.config.emailjs;
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          msg.style.display='block'; msg.style.color='#4CAF50';
          msg.textContent="Thank you! Your message has been sent.";
          form.reset();
        })
        .catch(() => {
          msg.style.display='block'; msg.style.color='#f44336';
          msg.textContent="Oops! There was a problem submitting your form.";
        });
    });
  }

  // On-scroll animations with improved timing
  const animateEls = document.querySelectorAll(
    ".hero h1, .hero p, .btn-primary, #about h2, #about p, " +
    "#projects h2, .project-card h3, .project-card p, .btn-secondary, " +
    "#skills h2, .skill-card h3, .skill-card p, #contact h2, .contact-form button, #donation h2"
  );
  
  // Get animation variables from CSS
  const styles = getComputedStyle(document.documentElement);
  const animDuration = styles.getPropertyValue('--animation-duration').trim() || '0.8s';
  const animEasing = styles.getPropertyValue('--animation-easing').trim() || 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
  
  // Reset animations
  animateEls.forEach(el=>{
    el.style.opacity=0; 
    el.style.animation='none';
  });
  
  // Create smoother intersection observer with lower threshold for earlier triggering
  const obs = new IntersectionObserver(entries=>{
    entries.forEach((ent, index)=>{
      if(ent.isIntersecting){
        // Add a small stagger effect based on element order
        const delay = index % 4 * 0.1;
        setTimeout(() => {
          ent.target.style.animation = `fadeInUp ${animDuration} ${animEasing} forwards`;
        }, delay * 1000);
        obs.unobserve(ent.target);
      }
    });
  },{threshold:0.15, rootMargin: "0px 0px -50px 0px"});
  animateEls.forEach(el=>obs.observe(el));

  // Lazy load images
  new LazyLoad({elements_selector:"img[loading='lazy']"});

  // arrow bounce color toggle
  const arrow = document.querySelector('.arrow-down');
  if(arrow){
    const styles = getComputedStyle(document.documentElement);
    const orange = styles.getPropertyValue('--hover-accent').trim();
    const purple = styles.getPropertyValue('--btn-primary-bg').trim();
    let isOrange = false;
    arrow.style.color = orange;
    arrow.addEventListener('animationiteration', () => {
      isOrange = !isOrange;
      arrow.style.color = isOrange ? purple : orange;
    });
  }
};
