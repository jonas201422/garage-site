// Haupt-JavaScript für die Garage Bar & Lounge Website
// Verarbeitet Navigation, Galerie, Menü und Reservierungsformular

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Toggle für mobile Ansicht
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Galerie dynamisch generieren
  const galleryImages = [
    'atmosphere1.jpg',
    'atmosphere2.jpg',
    'atmosphere3.jpg',
    'drinks.jpg',
    'food.jpg',
    'picture1.jpg',
  ];
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    galleryImages.forEach((src) => {
      const img = document.createElement('img');
      img.src = `assets/img/${src}`;
      img.alt = 'Garage Bar Galerie';
      galleryGrid.appendChild(img);
    });
  }

  // Lightbox für Galerie
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-content') : null;
  if (galleryGrid && lightbox && lightboxImg) {
    galleryGrid.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove('hidden');
      }
    });
    const closeBtn = lightbox.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }

  // Menü laden und rendern
  fetch('assets/js/menu.json')
    .then((response) => response.json())
    .then((data) => {
      const menuList = document.getElementById('menu-list');
      if (!menuList) return;
      data.categories.forEach((cat) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'menu-category';
        const title = document.createElement('h3');
        title.textContent = cat.name;
        catDiv.appendChild(title);
        const list = document.createElement('ul');
        cat.items.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${item.name}</strong><span class="price">${item.price}</span><p>${item.description}</p>`;
          list.appendChild(li);
        });
        catDiv.appendChild(list);
        menuList.appendChild(catDiv);
      });
    })
    .catch((err) => {
      console.error('Konnte Menü nicht laden', err);
    });

  // Reservierungsformular: erstelle Mailto-Link
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value;
      const email = document.getElementById('res-email').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const subject = encodeURIComponent('Reservierungsanfrage');
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\nDatum: ${date}\nUhrzeit: ${time}\nPersonen: ${guests}`
      );
      // Öffnet den Mailclient des Nutzers mit den Details
      window.location.href = `mailto:info@garage-bar.de?subject=${subject}&body=${body}`;
    });
  }

  // Sanfte Scrollanimations mit GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('section').forEach((sec) => {
      gsap.from(sec.querySelector('h2'), {
        scrollTrigger: {
          trigger: sec,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }
});