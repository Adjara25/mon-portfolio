// ===== NAVIGATION MOBILE =====
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animation du burger
    burger.classList.toggle('toggle');
});

// Fermer le menu au clic sur un lien
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// ===== SMOOTH SCROLLING =====
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMATION AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== ANIMATION DES BARRES DE COMPÉTENCES =====
const skillBars = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation de succès
    const button = contactForm.querySelector('.btn-primary');
    const originalText = button.textContent;
    
    button.textContent = '✓ Message envoyé !';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== ANIMATION DES CERCLES DU HERO =====
const circles = document.querySelectorAll('.circle');

circles.forEach((circle, index) => {
    circle.style.animationDelay = `${index * 2}s`;
});

// ===== EFFET PARALLAX LÉGER SUR LE HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== COMPTEUR ANIMÉ POUR LES STATS =====
const stats = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

console.log('Portfolio H&H chargé avec succès ! 🚀');

  (function(){
    emailjs.init("5EIlvWc0yJhriuIFZ"); // remplace par ta clé publique
  })();

  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_l1r6gee",     // ex: service_xxxxx
      "template_1bo9mur",    // ex: template_xxxxx
      this
    )
    .then(function() {
      alert("Message envoyé avec succès !");
      document.getElementById("contactForm").reset();
    }, function(error) {
      alert("Erreur lors de l'envoi 😢");
      console.log(error);
    });
  });