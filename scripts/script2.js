window.onload = function() {
    afficherHeure();
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
