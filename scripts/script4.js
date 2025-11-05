// On exÃ©cute tout au chargement de la page
window.onload = function() {
  loadStatus();
  loadAlarme();
  afficherHeure();
  const sectionHeight = window.innerHeight;
  window.scrollTo({
      top: 0 * sectionHeight,
      behavior: 'smooth'
  });
  window.history.pushState({}, '', '/');
};

// Gestion du menu
function toggleMenu() {
  const menu = document.getElementById('menu');
  const page = document.getElementById('page');
  menu.classList.toggle('open');
  page.classList.toggle('open');
  page.classList.toggle('open2');
}

// Afficher l'heure actuelle
function afficherHeure() {
  const now = new Date();
  let heure = now.getHours().toString().padStart(2, '0');
  let minute = now.getMinutes().toString().padStart(2, '0');
  let second = now.getSeconds().toString().padStart(2, '0');

  const heureActuelle = `${heure}:${minute}:${second}`;
  document.getElementById("date").textContent = heureActuelle;
  document.getElementById("dateTel").textContent = heureActuelle;

  setTimeout(afficherHeure, 1000);
}

// Changer de section
let currentIndex = 0;
function changeSection(index) {
  const container = document.getElementById('page');
  currentIndex = index;
  container.style.transform = `translateY(-${index * 100}%)`;
  toggleMenu();
}

// Changer le style gÃ©nÃ©ral
function changerStyle(bg, bg_bandeau, text_bandeau, bg_menu, text_widjet, bg_widjet, bg_button, text_widjet2) {
  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--bg-bandeau', bg_bandeau);
  document.documentElement.style.setProperty('--text-bandeau', text_bandeau);
  document.documentElement.style.setProperty('--bg-menu', bg_menu);
  document.documentElement.style.setProperty('--text-widjet', text_widjet);
  document.documentElement.style.setProperty('--bg-widjet', bg_widjet);
  document.documentElement.style.setProperty('--bg-button', bg_button);
  document.documentElement.style.setProperty('--text-widjet2', text_widjet2);
}

// Chargement des statuts et tempÃ©ratures
function fetchAndDisplayFile() {
  fetch('fichiers/statuts.txt')
      .then(response => response.text())
      .then(text => {
          const [bureau, chambre] = text.split(',').map(v => v.trim());
          document.getElementById('lampeBureau').textContent = bureau || "Valeur manquante";
          document.getElementById('lampeChambre').textContent = chambre || "Valeur manquante";
      })
      .catch(error => {
          console.error('Erreur statuts :', error);
          document.getElementById('lampeBureau').textContent = "Erreur";
          document.getElementById('lampeChambre').textContent = "Erreur";
      });

  fetch('fichiers/tempInt.txt')
      .then(response => response.text())
      .then(text => {
          const [temp, humi] = text.split(',').map(v => v.trim());
          document.getElementById('tempInt').textContent = temp || "Valeur manquante";
          document.getElementById('humiInt').textContent = humi || "Valeur manquante";
      })
      .catch(error => {
          console.error('Erreur temp intÃ©rieure :', error);
          document.getElementById('tempInt').textContent = "Erreur";
          document.getElementById('humiInt').textContent = "Erreur";
      });

  fetch('fichiers/tempExt.txt')
      .then(response => response.text())
      .then(text => {
          const [temp, humi] = text.split(',').map(v => v.trim());
          document.getElementById('tempExt').textContent = temp || "Valeur manquante";
          document.getElementById('humiExt').textContent = humi || "Valeur manquante";
      })
      .catch(error => {
          console.error('Erreur temp extÃ©rieure :', error);
          document.getElementById('tempExt').textContent = "Erreur";
          document.getElementById('humiExt').textContent = "Erreur";
      });

  fetch('fichiers/alarme.txt')
      .then(response => response.text())
      .then(text => {
          document.getElementById('alarme').textContent = text.trim();
      })
      .catch(error => {
          console.error('Erreur alarme :', error);
          document.getElementById('alarme').textContent = "Erreur";
      });
}

// RafraÃ®chir toutes les minutes
fetchAndDisplayFile();
setInterval(fetchAndDisplayFile, 60000);

// Mise Ã  jour des statuts avec envoi d'email
function updateStatus(place, state) {
  let xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `update_statuts.php?place=${place}&state=${state}`, true);
  xhr1.onreadystatechange = function() {
      if (xhr1.readyState == 4 && xhr1.status == 200) {
          console.log("Statut mis Ã  jour :", xhr1.responseText);
          loadStatus();
      }
  };
  xhr1.send();

  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `mail.php?place=${place}&state=${state}`, true);
  xhr2.send();
}

// Charger les statuts
function loadStatus() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "fichiers/statuts.txt?nocache=" + new Date().getTime(), true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          const [bureau, chambre] = xhr.responseText.trim().split(",");
          document.getElementById('lampeBureau').textContent = bureau || "Erreur";
          document.getElementById('lampeChambre').textContent = chambre || "Erreur";
      }
  };
  xhr.send();
}

// Mise Ã  jour de l'alarme avec envoi d'email
function updateAlarme(state) {
  let xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `update_alarme.php?state=${state}`, true);
  xhr1.onreadystatechange = function() {
      if (xhr1.readyState == 4 && xhr1.status == 200) {
          console.log("Alarme mise Ã  jour :", xhr1.responseText);
          loadAlarme();
      }
  };
  xhr1.send();

  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `mail.php?place=alarme&state=${state}`, true);
  xhr2.send();
}

// Charger l'Ã©tat de l'alarme
function loadAlarme() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "fichiers/alarme.txt?nocache=" + new Date().getTime(), true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
          if (xhr.status == 200) {
              document.getElementById('alarme').textContent = xhr.responseText.trim();
          } else {
              console.error('Erreur chargement alarme');
              document.getElementById('alarme').textContent = "Erreur";
          }
      }
  };
  xhr.send();
}
