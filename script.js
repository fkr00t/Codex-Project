// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const headerOverlay = document.querySelector('.header-overlay');
const navClose = document.querySelector('.nav-close');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (headerOverlay) headerOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
  });
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
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      headerOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

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

// Chat Widget Toggle
const chatButton = document.querySelector('.chat-button');
const chatPopup = document.querySelector('.chat-popup');
const closeChat = document.querySelector('.close-chat');
if (chatButton && chatPopup && closeChat) {
  chatButton.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
  });
  closeChat.addEventListener('click', () => {
    chatPopup.classList.remove('active');
  });
  document.addEventListener('click', (e) => {
    if (!chatButton.contains(e.target) && !chatPopup.contains(e.target)) {
      chatPopup.classList.remove('active');
    }
  });
}

// === Chat Widget Auto-Reply ===
(function() {
  const chatInput = document.querySelector('.chat-input input');
  const chatSendBtn = document.querySelector('.chat-input button');
  const chatBody = document.querySelector('.chat-body');

  // Fungsi untuk menambah pesan ke chat
  function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message ' + sender;
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Fungsi auto-reply sederhana
  function getBotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes('halo') || msg.includes('hai') || msg.includes('hello') || msg.includes('assalamualaikum')) {
      return 'Halo! Ada yang bisa kami bantu?';
    } else if (msg.includes('harga') || msg.includes('biaya') || msg.includes('tarif') || msg.includes('ongkos')) {
      return 'Untuk informasi harga layanan kami, silakan kunjungi halaman price atau chat langsung dengan admin kami. Kami siap membantu!';
    } else if (msg.includes('kontak') || msg.includes('hubungi') || msg.includes('nomor') || msg.includes('wa') || msg.includes('whatsapp') || msg.includes('nomer')) {
      return 'Anda bisa menghubungi kami melalui WhatsApp di +62 882-3058-4013, email support@codexproject.dev, atau di instagram codex.project_';
    } else if (msg.includes('alamat') || msg.includes('lokasi') || msg.includes('dimana')) {
      return 'Alamat kantor kami: Jl. Mawar Gg Coklat, Desa Biting, Kec.Arjasa, Kab.Jember, Indonesia.';
    } else if (msg.includes('layanan') || msg.includes('jasa') || msg.includes('service')) {
      return 'Kami menyediakan layanan seperti pembuatan website, pengembangan brand, content marketing, dan optimasi website. Ada yang ingin ditanyakan lebih lanjut?';
    } else if (msg.includes('portofolio') || msg.includes('contoh') || msg.includes('hasil')) {
      return 'Portofolio kami bisa dilihat di halaman Portofolio. Kami telah membantu banyak klien dari berbagai bidang.';
    } else if (msg.includes('bisa apa') || msg.includes('keunggulan') || msg.includes('kenapa pilih')) {
      return 'Kami menawarkan layanan profesional, support responsif, dan hasil berkualitas tinggi untuk mendukung bisnis Anda.';
    } else if (msg.includes('terima kasih') || msg.includes('thanks') || msg.includes('makasih')) {
      return 'Sama-sama! Jika ada pertanyaan lain, silakan chat kembali.';
    } else if (msg.includes('keamanan') || msg.includes('seo') || msg.includes('maintenence') || msg.includes('website')) {
      return 'Iya! ada layanan tersebut, jika berminat langsung chat saja pada admin.';
    } else if (msg.includes('skripsi') || msg.includes('tesis') || msg.includes('joki')) {
      return 'Ya! kami bisa membuatkan ada Tesis/Skripsi. Silhkan buka pada halaman Content Marketing untuk harganya';
    } else if (msg.includes('promo') || msg.includes('diskon') || msg.includes('potongan')) {
      return 'Untuk promo atau diskon terbaru, silakan cek halaman utama atau hubungi admin kami.';
    } else if (msg.includes('cara pesan') || msg.includes('order') || msg.includes('pesan')) {
      return 'Untuk memesan layanan, Anda bisa mengisi form kontak atau chat langsung dengan admin kami.';
    } else if (msg.includes('buka jam berapa') || msg.includes('jam operasional') || msg.includes('jam kerja')) {
      return 'Jam operasional kami: Senin - Sabtu, 08.00 - 17.00 WIB.';
    } else {
      return 'Jika ingin jawaban cepat, silakan hubungi admin kami yang ada pada halaman kontak.';
    }
  }

  // Kirim pesan saat tombol diklik atau enter ditekan
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, 'bot');
    }, 600);
  }

  if (chatSendBtn && chatInput && chatBody) {
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
})();

(function () {
  const chatInput = document.querySelector('.chat-input input');
  const chatPopup = document.querySelector('.chat-popup');

  if (!chatInput || !chatPopup) return;

  function updateChatPosition() {
    if (window.visualViewport) {
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      const keyboardHeight = windowHeight - viewportHeight;

      // Jika keyboard muncul (viewport jadi lebih pendek)
      if (keyboardHeight > 600) {
        chatPopup.style.bottom = (keyboardHeight + 20) + 'px';
      } else {
        chatPopup.style.bottom = '70px';
      }
    }
  }

  // Jalankan saat input difokuskan
  chatInput.addEventListener('focus', updateChatPosition);
  chatInput.addEventListener('blur', updateChatPosition);

  // Tambahan: update saat viewport berubah
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateChatPosition);
  }
})();

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



