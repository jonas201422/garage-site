# Garage Bar & Lounge Website

Dieses Repository enthält den kompletten Quellcode für eine moderne, mehrseitig wirkende One‑Pager‑Website der Garage Bar & Lounge. Die Seite nutzt aktuelle Webstandards (HTML5, CSS3 und modernes JavaScript) sowie kleine Animationen via GSAP. Sie integriert die bereitgestellten Assets (Bilder und Video) und ist vollständig responsive.

## Features

* **Hero Section** mit Hintergrund‑Video und Call‑to‑Action Buttons
* **Über uns** Abschnitt mit Beschreibung der Bar
* **Galerie** mit Lightbox, Bilder werden dynamisch per JavaScript eingefügt
* **Events** Raster für wiederkehrende Veranstaltungen
* **Getränkekarte** gerendert aus einer JSON‑Datei
* **Reservierungsformular**: öffnet den E‑Mail‑Client mit vorbefüllten Angaben
* **Kontakt** mit Adresse, Kontaktinformationen und einer eingebetteten Karte
* **Responsive Navigation** inklusive Mobile‑Toggle
* **Glassmorphism‑Design** mit dunkel‑eleganter Farbpalette

## Nutzung

Die Website kann direkt via GitHub Pages bereitgestellt werden. Lade den Inhalt dieses Ordners in ein öffentliches GitHub‑Repository hoch und aktiviere unter *Settings → Pages* die Bereitstellung aus dem `main`‑Branch. GitHub generiert daraufhin eine Vorschau‑URL.

Die Bilder befinden sich unter `assets/img` und das Video unter `assets/video`. Sollte das Video auf manchen Browsern nicht automatisch starten, empfiehlt es sich, einen `poster`‑Frame zu setzen oder zusätzlich ein WebM‑Format bereitzustellen.

### Menü anpassen

Die Getränkekarte wird aus der Datei `assets/js/menu.json` geladen. Kategorien und Artikel können dort einfach ergänzt oder geändert werden. Achte darauf, gültiges JSON zu schreiben.

---

© 2025 Garage Bar &amp; Lounge
