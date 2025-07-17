function includeHTML(targetSelector, filePath, callback) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch: ' + filePath);
        return response.text();
      })
      .then(data => {
        document.querySelector(targetSelector).innerHTML = data;
        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(err => console.error(err));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const headerPath = window.location.pathname.includes('/src/') ? '../header.html' : 'header.html';
    const footerPath = window.location.pathname.includes('/src/') ? '../footer.html' : 'footer.html';
  
    includeHTML('#header-placeholder', headerPath, function() {
      console.log('Header Loaded ✅');
      activateMenu();
      initMobileNavbar();
    });
  });
    

    function initMobileNavbar() {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      const headerOverlay = document.querySelector('.header-overlay');
    
      if (hamburger && navMenu && headerOverlay) {
        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
          headerOverlay.classList.toggle('active');
          document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
        });
    
        headerOverlay.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          headerOverlay.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
    
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            headerOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
          });
        });
        // Event untuk tombol close nav-menu
        const navClose = document.querySelector('.nav-close');
        if (navClose) {
          navClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            headerOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
          });
        }
      } else {
        console.error('Navbar elements not found');
      }
    
      // ✅ Dropdown Menu Mobile
      const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
      const dropdown = document.querySelector('[data-dropdown]');
    
      if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) { // Hanya untuk mobile
            e.preventDefault();
            dropdown.classList.toggle('open');
          }
        });
    
        document.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
              dropdown.classList.remove('open');
            }
          }
        });
      }
    }
    
  
// Tambahkan fungsi untuk menandai nav-link aktif
function activateMenu() {
  const path = window.location.pathname.replace(/\\/g, '/').split('/').pop();
  const fullPath = window.location.pathname.replace(/\\/g, '/');
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Untuk Beranda (index.html), cek juga ../index.html
    if (
      ((path === '' || path === 'index.html') && (href === 'index.html' || href === '../index.html' || href === '/index.html')) ||
      (href && (
        href === path ||
        href === fullPath ||
        fullPath.endsWith(href) ||
        ('/src/' + path) === href ||
        ('src/' + path) === href
      ))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  // --- Aktifkan nav-link Layanan jika di halaman layanan ---
  const layananPages = [
    'content-marketing.html',
    'website-optimization.html',
    'visual-engagement.html',
    'web-development.html',
    'brand-development.html',
    'server-reliability.html'
  ];
  // Cek dengan pathname saja agar lebih fleksibel
  if (layananPages.some(page => window.location.pathname.toLowerCase().includes(page))) {
    const layananLink = Array.from(document.querySelectorAll('.nav-link')).find(link => link.textContent.trim().toLowerCase().includes('layanan'));
    if (layananLink) layananLink.classList.add('active');
  }
}
  