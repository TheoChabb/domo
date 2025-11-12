window.onload = function() {
    afficherHeure();
    const sectionHeight = window.innerHeight;
    window.scrollTo({
        top: 0 * sectionHeight,
        behavior: 'smooth'
    });

    putUser();
};

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
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

function putUser() {
    let user = localStorage.getItem('user');
    //alert(user);
    
    const input = document.getElementById("nomTache");
    input.addEventListener("keydown", function(event) {
        envoyer(event, 'add', user); // Utilise la variable ici
    });
    
    const select = document.getElementById("selectColonne");
    select.addEventListener("keydown", function(event) {
        envoyer(event, 'add', user); // Utilise la variable ici
    });
    
    const button = document.getElementById("boutonAjouter");
    button.addEventListener("keydown", function(event) {
        ajouterTache(user); // Utilise la variable ici
    });
    
    const buttonRefresh = document.getElementById("boutonRefresh");
    buttonRefresh.addEventListener("keydown", function(event) {
        refreshTaches(user);
    });
}
