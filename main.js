// Script to power interactivity for the Garage dark redesign
// Handles mobile navigation, gallery generation, menu rendering, reservations and reveal animations

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Dynamically populate gallery with selected images
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
      img.src = `${src}`;
      img.alt = 'Garage Bar Galerie';
      galleryGrid.appendChild(img);
    });
  }

  // Lightbox for gallery
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

  // Load menu from JSON and render into the menu section
  fetch('menu.json')
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
          li.innerHTML = `\n            <strong>${item.name}</strong>\n            <span class="price">${item.price}</span>\n            <p>${item.description}</p>\n          `;
          list.appendChild(li);
        });
        catDiv.appendChild(list);
        menuList.appendChild(catDiv);
      });
    })
    .catch((err) => {
      console.error('Konnte die Getränkekarte nicht laden', err);
    });
   });
  }// Reservation form: send data to backend
const resForm = document.getElementById('reservationForm');
if (resForm) {
  resForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const email = document.getElementById('res-email').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const message = document.getElementById('res-message').value;
    try {
      const response = await fetch('/api/reservieren', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          datum: date,
          uhrzeit: time,
          personen: guests,
          nachricht: message
        })
      });
      const result = await response.json();
      if (result.success) {
        alert('Reservierung erfolgreich gesendet!');
        resForm.reset();
      } else {
        alert('Es ist ein Fehler aufgetreten.');
      }
    } catch (err) {
      console.error(err);
      alert('Beim Senden der Reservierung ist ein Fehler aufgetreten.');
    }
  });
}

  // Reveal animations: fade sections into view on scroll
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.section').forEach((sec) => {
    sec.classList.add('reveal');
    observer.observe(sec);
  });
});
