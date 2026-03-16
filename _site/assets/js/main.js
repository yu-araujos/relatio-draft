document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  const roiElement = document.getElementById('roi-number');
  
  // --- MENU LOGIC ---
  if (menuBtn) {
    const spans = menuBtn.querySelectorAll('span');
    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      menuBtn.setAttribute('aria-expanded', isMenuOpen);
      mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
      
      if (isMenuOpen) {
        mobileMenu.classList.replace('opacity-0', 'opacity-100');
        mobileMenu.classList.replace('pointer-events-none', 'pointer-events-auto');
        spans[0].classList.add('rotate-45', 'translate-y-[11px]', 'w-full');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-[11px]', 'w-full');
        spans.forEach(span => {
          span.classList.remove('bg-relatio-off', 'group-hover:bg-relatio-accent');
          span.classList.add('bg-relatio-blue');
        });
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.replace('opacity-100', 'opacity-0');
        mobileMenu.classList.replace('pointer-events-auto', 'pointer-events-none');
        spans[0].classList.remove('rotate-45', 'translate-y-[11px]', 'w-full');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-[11px]', 'w-full');
        spans.forEach(span => {
          span.classList.remove('bg-relatio-blue');
          span.classList.add('bg-relatio-off', 'group-hover:bg-relatio-accent');
        });
        document.body.style.overflow = '';
      }
    }

    menuBtn.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }

  // --- ROI COUNTER LOGIC ---
  const animateCounter = () => {
    const target = parseInt(roiElement.getAttribute('data-target'));
    const duration = 7500;
    const frameDuration = 1000 / 30;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentNumber = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      roiElement.textContent = currentNumber;
      if (frame === totalFrames) {
        clearInterval(counter);
        roiElement.textContent = target;
      }
    }, frameDuration);
  };

  if (roiElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounter, 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(roiElement);
  }

  // --- CUSTOM CURSOR LOGIC ---
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    
    if (cursor && ring) {
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
          ring.style.left = e.clientX + 'px';
          ring.style.top = e.clientY + 'px';
        }, 60);
      });
      
      document.querySelectorAll('a, button, .who-card, .svc-item, #casesCarousel .group, #processo .group').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.replace('w-9', 'w-[60px]');
          ring.classList.replace('h-9', 'h-[60px]');
          cursor.classList.replace('scale-100', 'scale-50');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.replace('w-[60px]', 'w-9');
          ring.classList.replace('h-[60px]', 'h-9');
          cursor.classList.replace('scale-50', 'scale-100');
        });
      });

      const contatoSection = document.getElementById('contato');
      if (contatoSection) {
        contatoSection.addEventListener('mouseenter', () => {
          cursor.style.backgroundColor = '#005A9C';
          ring.style.borderColor = '#005A9C';
        });
        
        contatoSection.addEventListener('mouseleave', () => {
          cursor.style.backgroundColor = '';
          ring.style.borderColor = '';
        });
      }
    }
  }

  // --- HEADER ---
  const header = document.getElementById('main-header');
  
  if (header) {
    const logoText = header.querySelector('a.font-serif');
    const headerSpans = header.querySelectorAll('#menu-btn span');
    const menuLinksTexts = document.querySelectorAll('#mobile-menu .menu-link');
    
    const allLightElements = document.querySelectorAll('.bg-relatio-off');
    const lightSections = Array.from(allLightElements).filter(el => el.offsetHeight > 100);

    function updateHeaderColors() {
      if (window.scrollY > 50) {
        header.classList.remove('py-6');
        header.classList.add('py-4', 'backdrop-blur-md', 'bg-white/5', 'border-b', 'border-white/10');
      } else {
        header.classList.remove('py-4', 'backdrop-blur-md', 'bg-white/5', 'border-b', 'border-white/10');
        header.classList.add('py-6');
      }

      // 2. Os Dois Radares de Posição
      const headerMid = header.getBoundingClientRect().top + (header.offsetHeight / 2); 
      const screenMid = window.innerHeight / 2; 
      
      let headerOverLight = false;
      let screenMidOverLight = false;

      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (headerMid >= rect.top && headerMid <= rect.bottom) {
          headerOverLight = true;
        }
        
        if (screenMid >= rect.top && screenMid <= rect.bottom) {
          screenMidOverLight = true;
        }
      });

      if (headerOverLight) {
        if (logoText) {
          logoText.classList.remove('text-relatio-off');
          logoText.classList.add('text-relatio-dark');
        }
        headerSpans.forEach(span => {
          if (!span.classList.contains('bg-relatio-blue')) {
            span.classList.remove('bg-relatio-off');
            span.classList.add('bg-relatio-dark');
          }
        });
      } else {
        if (logoText) {
          logoText.classList.remove('text-relatio-dark');
          logoText.classList.add('text-relatio-off');
        }
        headerSpans.forEach(span => {
          if (!span.classList.contains('bg-relatio-blue')) {
            span.classList.remove('bg-relatio-dark');
            span.classList.add('bg-relatio-off');
          }
        });
      }

      if (screenMidOverLight) {
        menuLinksTexts.forEach(link => {
          link.classList.remove('text-relatio-off');
          link.classList.add('text-relatio-dark');
        });
      } else {
        menuLinksTexts.forEach(link => {
          link.classList.remove('text-relatio-dark');
          link.classList.add('text-relatio-off');
        });
      }
    }

    window.addEventListener('scroll', updateHeaderColors);
    updateHeaderColors();
  }

});