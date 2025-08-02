// Mobile Menu Toggle - Hanya untuk halaman beranda
function initHamburgerMenu() {
  // Hanya jalankan di halaman beranda
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html' && window.location.pathname !== '') {
    console.log('Skipping hamburger menu init for non-homepage - handled by include-header-footer.js');
    return;
  }
  
  console.log('Initializing hamburger menu from script.js for homepage...');
  
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const headerOverlay = document.querySelector('.header-overlay');
  const navClose = document.querySelector('.nav-close');

  if (hamburger && navMenu) {
    console.log('Found hamburger elements, adding event listeners...');
    
    // Hapus event listener lama jika ada
    const oldHandler = hamburger._clickHandler;
    if (oldHandler) {
      hamburger.removeEventListener('click', oldHandler);
    }
    
    // Buat handler baru
    function hamburgerClickHandler() {
      console.log('Hamburger clicked from script.js!');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (headerOverlay) headerOverlay.classList.toggle('active');
      document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    }
    
    // Simpan reference ke handler
    hamburger._clickHandler = hamburgerClickHandler;
    
    // Tambahkan event listener baru
    hamburger.addEventListener('click', hamburgerClickHandler);
  }

  if (navClose && hamburger && navMenu && headerOverlay) {
    navClose.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      headerOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }

  // Nav link close menu on click
  if (hamburger && navMenu && headerOverlay) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        // Jangan tutup menu jika ini adalah dropdown toggle
        if (link.closest('.dropdown') && link.querySelector('i.fa-chevron-down')) {
          console.log('Dropdown toggle clicked - not closing menu');
          return;
        }
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        headerOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  

}

// Jalankan saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Tunggu sebentar untuk memastikan header sudah dimuat
  setTimeout(initHamburgerMenu, 500);
});

// Jalankan juga saat window load
window.addEventListener('load', function() {
  setTimeout(initHamburgerMenu, 300);
});

// FAQ Accordion
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
  const toggle = card.querySelector('.faq-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      faqCards.forEach(other => {
        if (other !== card) other.classList.remove('active');
      });
      card.classList.toggle('active');
    });
  }
});





// Smooth scrolling for navigation links
if (document.querySelectorAll('a[href^="#"]').length) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value;
    const company = contactForm.querySelector('input[type="text"]:nth-of-type(2)')?.value || '';
    const email = contactForm.querySelector('input[type="email"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector('textarea').value;
    if (!name || !email || !message) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    // Tidak fetch ke backend, hanya alert sukses
    setTimeout(() => {
      alert('Terima kasih! Pesan Anda telah terkirim.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

// Animate elements on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature-card, .service-card, .need-card, .testimonial-card');
  animateElements.forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    }
  });
});


// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.innerHTML = `${Math.floor(current)}${suffix}`;
    }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                if (text.includes('/')) {
                    // Ambil angka sebelum /
                    const parts = text.split('/');
                    const start = parseInt(parts[0].trim());
                    const suffix = `/${parts[1].trim()}`;
                    animateCounter(stat, start, suffix);
                } else if (text.includes('+')) {
                    const num = parseInt(text);
                    animateCounter(stat, num, '+');
                } else {
                    const num = parseInt(text);
                    animateCounter(stat, num);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}




// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;
document.body.appendChild(backToTopBtn);
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add hover effects for interactive elements
const ctaBtns = document.querySelectorAll('.cta-button, .submit-btn');
ctaBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }
});

// Add typing effect for hero title
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  setTimeout(typeWriter, 500);
}

function activateMenu() {
  const menuItems = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.replace(/\/+/, '/');
  menuItems.forEach(item => {
    let href = item.getAttribute('href');
    let linkUrl;
    try {
      linkUrl = new URL(href, window.location.origin);
    } catch (e) {
      return item.classList.remove('active');
    }
    let linkPath = item.getAttribute('href').replace('.html', '');
    if (linkPath === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

const layananPages = [
    'content-marketing.html',
    'website-optimization.html',
    'visual-engagement.html',
    'web-development.html',
    'brand-development.html',
    'server-reliability.html'
];

// Tambahkan ini sebelum baris 255
const currentPath = window.location.pathname;

const isLayananPage = layananPages.some(page => currentPath.includes(page));
console.log('Is Layanan Page:', isLayananPage); // Log if the current page is a layanan page
if (isLayananPage) {
    const layananLink = Array.from(menuItems).find(link => link.textContent.trim().toLowerCase().includes('layanan'));
    if (layananLink) {
        console.log('Activating Layanan Link'); // Log when Layanan is activated
        layananLink.classList.add('active');
    }
}
window.activateMenu = activateMenu;
document.addEventListener('DOMContentLoaded', activateMenu);



// Add floating animation to hero image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    heroImage.style.animation = 'float 6s ease-in-out infinite';
}
// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    .hero-image {
        animation: float 6s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// FAQ Toggle functionality
// (Pastikan elemen tidak null sebelum akses style)
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    const faqItem = question.parentElement;
    const answer = faqItem ? faqItem.querySelector('.faq-answer') : null;
    const icon = question.querySelector('.faq-icon i');
    if (faqItem) faqItem.classList.remove('active');
    if (answer) answer.style.maxHeight = '0';
    if (icon) icon.style.transform = 'rotate(0deg)';
    question.addEventListener('click', function() {
      const currentFaqItem = this.parentElement;
      const currentAnswer = currentFaqItem ? currentFaqItem.querySelector('.faq-answer') : null;
      const currentIcon = this.querySelector('.faq-icon i');
      const isActive = currentFaqItem && currentFaqItem.classList.contains('active');
      // Tutup semua FAQ lain
      faqQuestions.forEach(otherQuestion => {
        const otherFaqItem = otherQuestion.parentElement;
        const otherAnswer = otherFaqItem ? otherFaqItem.querySelector('.faq-answer') : null;
        const otherIcon = otherQuestion.querySelector('.faq-icon i');
        if (otherFaqItem !== currentFaqItem) {
          if (otherFaqItem) otherFaqItem.classList.remove('active');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });
      // Toggle FAQ yang diklik
      if (currentFaqItem) currentFaqItem.classList.toggle('active');
      if (currentAnswer) currentAnswer.style.maxHeight = isActive ? '0' : currentAnswer.scrollHeight + 'px';
      if (currentIcon) currentIcon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
});

// Perbaiki error addEventListener pada emailForm

const contactFormEl = document.getElementById('contactForm');
if (contactFormEl) {
  contactFormEl.addEventListener('submit', async function(e) {
      e.preventDefault(); // cegah form pindah halaman

      const form = e.target;
      const formData = new FormData(form);

      try {
          const response = await fetch("https://formspree.io/f/xblkjvvk", {
              method: "POST",
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          });

          if (response.ok) {
              alert("Pesan Anda segera diproses. Terima kasih!");
              form.reset();
              location.reload(); // refresh halaman
          } else {
              alert("Terjadi kesalahan. Silakan coba lagi.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("Koneksi gagal. Silakan coba lagi.");
      }
  });
}



