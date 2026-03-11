/**
 * Premium Developer Portfolio - Main JavaScript
 * Features: Dark/Light Mode, Animations, Form Validation, Particles, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initPageLoader();
  initThemeToggle();
  initNavigation();
  initScrollProgress();
  initScrollReveal();
  initTypingAnimation();
  initParticles();
  initSkillBars();
  initCircularSkills();
  initProjectFilters();
  initProjectModals();
  initCertificateModals();
  initContactForm();
  initSmoothScroll();
});

/* ============================================
   PAGE LOADER
   ============================================ */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500);
    });
  }
}

/* ============================================
   THEME TOGGLE (Dark/Light Mode)
   ============================================ */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinkItems.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
function initTypingAnimation() {
  const typingElement = document.querySelector('.hero-typing');
  if (!typingElement) return;
  
  const texts = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typingElement.appendChild(cursor);
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing animation
  setTimeout(type, 1000);
}

/* ============================================
   PARTICLE BACKGROUND
   ============================================ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let isActive = true;
  
  // Check for touch device - disable particles on mobile
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) {
    canvas.style.display = 'none';
    return;
  }
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particles = [];
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function connectParticles() {
    const maxDistance = 100;
    const maxConnections = 3;
    
    for (let i = 0; i < particles.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance && connections < maxConnections) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(pparticles[j].x, particles[j].y);
          ctx.stroke();
          connections++;
        }
      }
    }
  }
  
  let frameCount = 0;
  function animate() {
    if (!isActive) return;
    
    frameCount++;
    // Render every 2nd frame for performance (30fps)
    if (frameCount % 2 === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Visibility check - pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isActive = false;
      cancelAnimationFrame(animationId);
    } else {
      isActive = true;
      animate();
    }
  });
  
  init();
  animate();
}

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        if (width) {
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
        }
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillObserver.observe(bar));
}

/* ============================================
   CIRCULAR SKILLS ANIMATION
   ============================================ */
function initCircularSkills() {
  const circularSkills = document.querySelectorAll('.circular-sill-progress');
  
  const circularObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percent = circle.getAttribute('data-percent');
        if (percent) {
          const circumference = 2 * Math.PI * 45; // r=45
          const offset = circumference - (percent / 100) * circumference;
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 200);
        }
        circularObserver.unobserve(circle);
      }
    });
  }, { threshold: 0.5 });
  
  circularSkills.forEach(circle => circularObserver.observe(circle));
}

/* ============================================
   PROJECT FILTERS
   ============================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================
   PROJECT MODALS
   ============================================ */
function initProjectModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

/* ============================================
   CERTIFICATE MODALS
   ============================================ */
function initCertificateModals() {
  const certCards = document.querySelectorAll('.certificate-card');
  const certModal = document.getElementById('certificate-modal');
  const certModalImg = document.getElementById('certificate-modal-img');
  const certModalTitle = document.getElementById('certificate-modal-title');
  const certModalOrg = document.getElementById('certificate-modal-org');
  
  if (!certModal) return;
  
  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.certificate-image img');
      const title = card.querySelector('.certificate-title');
      const org = card.querySelector('.certificate-org');
      
      if (certModalImg) certModalImg.src = img.src;
      if (certModalTitle) certModalTitle.textContent = title.textContent;
      if (certModalOrg) certModalOrg.textContent = org.textContent;
      
      certModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = form.querySelector('.form-submit');
  
  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^[\s\S]{10,500}$/
  };
  
  function validateField(input, pattern) {
    const value = input.value.trim();
    const errorEl = input.parentElement.querySelector('.error-message');
    const fieldName = input.getAttribute('name');
    
    let isValid = true;
    let errorMsg = '';
    
    if (value === '') {
      isValid = false;
      errorMsg = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else if (!pattern.test(value)) {
      isValid = false;
      if (fieldName === 'name') {
        errorMsg = 'Please enter a valid name (2-50 characters)';
      } else if (fieldName === 'email') {
        errorMsg = 'Please enter a valid email address';
      } else if (fieldName === 'message') {
        errorMsg = 'Message must be between 10-500 characters';
      }
    }
    
    if (!isValid) {
      input.classList.add('error');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add('show');
      }
    } else {
      input.classList.remove('error');
      if (errorEl) {
        errorEl.classList.remove('show');
      }
    }
    
    return isValid;
  }
  
  // Real-time validation
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    
    input.addEventListener('blur', () => {
      const pattern = patterns[input.getAttribute('name')];
      validateField(input, pattern);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const pattern = patterns[input.getAttribute('name')];
        validateField(input, pattern);
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = nameInput ? validateField(nameInput, patterns.name) : true;
    const isEmailValid = emailInput ? validateField(emailInput, patterns.email) : true;
    const isMessageValid = messageInput ? validateField(messageInput, patterns.message) : true;
    
    if (isNameValid && isEmailValid && isMessageValid) {
      // Show success message
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.disabled = true;
      
      // Reset form
      form.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
      
      // Here you would normally send the form data to a server
      console.log('Form submitted successfully!');
    }
  });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Intersection Observer helper
function observeElements(elements, callback, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });
  
  elements.forEach(el => observer.observe(el));
}

// Add CSS animation class
function animateElement(element, animationClass, delay = 0) {
  setTimeout(() => {
    element.classList.add(animationClass);
  }, delay);
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Export functions for global access
window.Portfolio = {
  debounce,
  throttle,
  observeElements,
  animateElement,
  animateCounter
};
