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
      // Delay sedikit untuk memastikan DOM sudah siap
      setTimeout(() => {
        console.log('Calling activateMenu from DOMContentLoaded');
        activateMenu();
        initMobileNavbar();
      }, 100);
    });
  });
  
  // Panggil activateMenu juga saat halaman selesai loading
  window.addEventListener('load', function() {
    setTimeout(() => {
      console.log('Calling activateMenu from window.load');
      activateMenu();
    }, 200);
  });
  
  // Panggil activateMenu setiap kali URL berubah (untuk SPA behavior)
  window.addEventListener('popstate', function() {
    setTimeout(() => {
      console.log('Calling activateMenu from popstate');
      activateMenu();
    }, 100);
  });
    

    function initMobileNavbar() {
      console.log('Initializing mobile navbar from include-header-footer.js...');
      
      // Tunggu sebentar untuk memastikan DOM sudah siap
      setTimeout(() => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const headerOverlay = document.querySelector('.header-overlay');
        
        console.log('Found elements:', {
          hamburger: !!hamburger,
          navMenu: !!navMenu,
          headerOverlay: !!headerOverlay
        });
      
        if (hamburger && navMenu && headerOverlay) {
          // Hapus event listener lama jika ada
          const oldHandler = hamburger._clickHandler;
          if (oldHandler) {
            hamburger.removeEventListener('click', oldHandler);
          }
          
          // Buat handler baru
          function hamburgerClickHandler() {
            console.log('Hamburger clicked from include-header-footer.js!');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            headerOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
          }
          
          // Simpan reference ke handler
          hamburger._clickHandler = hamburgerClickHandler;
          
          // Tambahkan event listener baru
          hamburger.addEventListener('click', hamburgerClickHandler);
      
          // Handler untuk overlay click
          headerOverlay.addEventListener('click', () => {
            console.log('Overlay clicked!');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            headerOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
          });
      
          // Handler untuk nav links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
              // Jangan tutup menu jika ini adalah dropdown toggle
              if (link.closest('.dropdown') && link.querySelector('i.fa-chevron-down')) {
                console.log('Dropdown toggle clicked - not closing menu');
                return;
              }
              
              console.log('Nav link clicked!');
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              headerOverlay.classList.remove('active');
              document.body.classList.remove('menu-open');
            });
          });
          
          // Handler untuk tombol close
          const navClose = document.querySelector('.nav-close');
          if (navClose) {
            navClose.addEventListener('click', () => {
              console.log('Nav close clicked!');
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              headerOverlay.classList.remove('active');
              document.body.classList.remove('menu-open');
            });
          }
          
          console.log('Mobile navbar initialized successfully!');
        } else {
          console.error('Navbar elements not found:', {
            hamburger: !!hamburger,
            navMenu: !!navMenu,
            headerOverlay: !!headerOverlay
          });
        }
        
        // ✅ Dropdown untuk desktop
        const dropdownToggle = document.querySelector('.dropdown .nav-link');
        const dropdown = document.querySelector('.dropdown');
      
        if (dropdownToggle && dropdown) {
          // Hanya untuk desktop (hover)
          if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
              dropdown.classList.add('open');
            });
            
            dropdown.addEventListener('mouseleave', () => {
              dropdown.classList.remove('open');
            });
          }
        }

      }, 300); // Tunggu 300ms untuk memastikan header sudah dimuat
    }
    
  
// Tambahkan fungsi untuk menandai nav-link aktif
function activateMenu() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop();
  
  console.log('=== MENU ACTIVATION DEBUG ===');
  console.log('Current path:', currentPath);
  console.log('Current page:', currentPage);
  
  const navLinks = document.querySelectorAll('.nav-link');
  console.log('Found nav links:', navLinks.length);
  
  // Reset semua active states
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Mapping halaman ke menu
  const pageMenuMapping = {
    '': 'Beranda',
    'index.html': 'Beranda',
    'about-us.html': 'Tentang Kami',
    'portofolio.html': 'Portofolio',
    'price.html': 'Harga',
    'contact.html': 'Kontak',
    'content-marketing.html': 'Layanan',
    'website-optimization.html': 'Layanan',
    'brand-development.html': 'Layanan'
  };
  
  // Cari menu yang harus aktif
  const targetMenu = pageMenuMapping[currentPage];
  console.log('Target menu:', targetMenu);
  
  if (targetMenu) {
    navLinks.forEach(link => {
      const linkText = link.textContent.trim();
      console.log('Checking:', linkText, 'against:', targetMenu);
      
      if (linkText === targetMenu) {
        console.log('✅ Activating:', linkText);
        link.classList.add('active');
      }
    });
    
    // Khusus untuk mobile: pastikan button Layanan mobile juga aktif
    if (targetMenu === 'Layanan') {
      const layananMobile = document.querySelector('.layanan-mobile .nav-link');
      if (layananMobile) {
        console.log('✅ Activating mobile Layanan button');
        layananMobile.classList.add('active');
      } else {
        console.log('❌ Mobile Layanan button not found');
      }
    }
  }
  
  // Fallback: cek berdasarkan href
  if (!targetMenu) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const hrefPage = href.split('/').pop();
      console.log('Fallback check:', link.textContent, 'href:', hrefPage);
      
      if (hrefPage === currentPage) {
        console.log('✅ Fallback activating:', link.textContent);
        link.classList.add('active');
      }
    });
  }
  
  console.log('=== MENU ACTIVATION COMPLETED ===');
}

// Tambahkan event listener untuk window resize
window.addEventListener('resize', function() {
  setTimeout(activateMenu, 100);
});
  