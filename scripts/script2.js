window.onload = function() {
    afficherHeure();
    const sectionHeight = window.innerHeight;
    window.scrollTo({
        top: 0 * sectionHeight,
        behavior: 'smooth'
    });
};

function toggleMenu() {
  const menu = document.getElementById('menu');
  const page = document.getElementById('page');
  menu.classList.toggle('open');
  page.classList.toggle('open');
  page.classList.toggle('open2');
}

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

let currentIndex = 0;
function changeSection(index) {
  const container = document.getElementById('page');
  currentIndex = index;
  container.style.transform = `translateY(-${index * 100}%)`;
  toggleMenu();
}
