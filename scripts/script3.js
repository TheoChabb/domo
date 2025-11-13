async function getUrl(url) {
    try {
        const response = await fetch("https://corsproxy.io/?" + url);
        const data = await response.json();
        return(data);
    } catch (error) {
        return("Erreur in get URL : " + url);
    }
}

chargerTaches('Theo')

async function chargerTaches(user){
    fichUser = await getUrl("http://domo.theo.free.fr/data_github/users.json");
    fichMainData = await getUrl("http://domo.theo.free.fr/data_github/main_data.json");
    fichData = await getUrl("http://domo.theo.free.fr/data_github/data_taches.json");
    
    for(section in fichMainData.body){
        idSection = "section_" + fichMainData.body[section].id;
        document.getElementById(idSection).innerHTML = null;
    }


    localStorage.setItem("lastFichData", JSON.stringify(fichData));

    for(tache in fichData){
        //bgColor = "background-color: " + fichUser[fichData[tache].user].color + ";";
        bgColor = "background-color: " + "#bae6fd" + ";";
        //utilisateurMaj = fichUser[fichData[tache].user].name;
        utilisateurMaj = "Theo";
        colonneTache = "section_" + fichData[tache].colonne;
        idTache = fichData[tache].id;
        valueElement = fichData[tache].texte;
        //console.log("Bg : " + bgColor + "\nUser : " + utilisateurMaj + "\nColonne : " + colonneTache + "\nId : " + idTache + "\nTexte : " + valueElement + "\n");

        divTache = '<div class="tache" style="' + bgColor + '" draggable="true" data-id="' + idTache + '" data-user="' + user + '" style="" oncontextmenu="afficherContextMenu(' + idTache + ', event, \'' + user + '\'); return false;" >' + 
                        '<span class="title">' + valueElement + '</span>' + 
                        '<div class="meta">' +
                            '<span>👤 ' + utilisateurMaj + '</span>' +
                            '<button class="del" onclick="supprimerTache(' + "'" + idTache + "'" + ', ' + "'" + user + "'" + ')">✖</button>' +
                        '</div>' +
                    '</div>';
        //console.log(divTache + "\n\n");
        
        document.getElementById(colonneTache).innerHTML = document.getElementById(colonneTache).innerHTML + divTache;
    }

    // Charger le conteur
    chargerCompteur(user);
}

function envoyer(event, action, user) {
    if (event.key === "Enter") {
    event.preventDefault();
    if (action === "add") ajouterTache(user);
    if (action === "delete") supprimerTache(user);
    if (action === "edit") modifierTache(user);
    if (action === "history") voirHistorique(user);
    }
}

function ajouterTache(user) {
    const texte = document.getElementById("nomTache").value;
    const colonne = document.getElementById("selectColonne").value;

    if (!texte) {
        alert("❌ Impossible de créer une tâche vide !");
        return;
    }else{

    const data = { action: "add", user, colonne, texte };

    fetch("https://corsproxy.io/?http://domo.theo.free.fr/sauvegarde.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    })
    .then(res => res.text())
        .then(msg => {
        if (msg) {
            //alert(msg);
        }});
    document.getElementById("nomTache").value = "";
}
}

function supprimerTache(id, user) {
    const userSupp = user;

    const data = { action: "delete", id: parseInt(id, 10), user: userSupp };

    fetch("https://corsproxy.io/?http://domo.theo.free.fr/sauvegarde.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        if (msg) {
            //alert(msg);
        }});
}

function afficherContextMenu(idTache, event, user) {
    const backContextMenu = document.getElementById("clickDroit");
    const contextMenu = document.getElementById("ul_clickDroit");
    const supprimerTacheBtn = document.getElementById("supprimerTache");
    const modifierTacheBtn = document.getElementById("modifierTache");
    const historiqueTacheBtn = document.getElementById("historiqueTache");

    backContextMenu.onclick = closeContextMenu;

    backContextMenu.style.display = "block";    
    backContextMenu.style.width = "100%"; 
    backContextMenu.style.height = "100%";
    backContextMenu.style.position = "fixed";
    backContextMenu.style.top = "0px";
    backContextMenu.style.borderRadius = "0px";
    backContextMenu.style.background = "rgba(0,0,0,0.1)";

    contextMenu.style.background = "var(--colonne)";
    contextMenu.style.position = "absolute";
    contextMenu.style.minWidth = "100px";
    contextMenu.style.borderRadius = "8px";
    contextMenu.style.top = event.clientY + "px";
    contextMenu.style.left = event.clientX + "px";

    alert("toto");

    supprimerTacheBtn.onclick = function() {
        supprimerTache(idTache, user);
    };

    modifierTacheBtn.onclick = function() {
        afficherPopupModifierTache(idTache, user);
    };

    historiqueTacheBtn.onclick = function() {
        afficherPopupHistoriqueTache(idTache, user);
    };
}

function closeContextMenu(){
    const backContextMenu = document.getElementById("clickDroit");
    backContextMenu.style.display = "none";    
}
async function chargerCompteur(user) {
    fichData = await getUrl("data/taches/data_taches.json");
    for(section in fichMainData.body){
        i = 0;
        for(tache in fichData){
            if(fichData[tache].colonne == fichMainData.body[section].id){
                i = i + 1;
            }
        }
        document.getElementById("count_section_" + fichMainData.body[section].id).textContent = i;
    }
}

async function afficherPopupModifierTache(idTache, user) {
    fichData = await getUrl("http://domo.theo.free.fr/data_github/data_taches.json");

    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");
    const enregistrerPopup = document.getElementById("enregistrerPopup");
    const fermerPopup = document.getElementById("fermerPopup");
    
    for(tache in fichData){
        texteTache = fichData[tache].id;
        if(texteTache === idTache){
            lastTache = fichData[tache].texte;
            idTache = texteTache;
            document.getElementById("inputNomTache").value = lastTache;
        }
    }

    popup.style.display = "block";

    popupContent.style.position = "fixed";
    popupContent.style.minWidth = "300px";
    popupContent.style.top = "50%";
    popupContent.style.left = "50%";
    popupContent.style.transform = "translate(-50%, -80%)";
    popupContent.style.width = "auto";

    enregistrerPopup.onclick = function() {
        modifierTache(lastTache, user, idTache);
    };

    fermerPopup.onclick = function() {
        closePopup();
    };
}

function closePopup() {
    const backContextMenu = document.getElementById("popup");
    backContextMenu.style.display = "none";    
}

function modifierTache(lastTache, user, idTache) {
    const nouveauTexte = document.getElementById("inputNomTache").value;

    if(!nouveauTexte) {
        alert("❌ Impossible de modifier une tâche vide !");
        return;
    }

    if(nouveauTexte == lastTache){
        alert("❌ Le texte est identique, rien à modifier !");
        return;
    }

    const data = { action: "edit", id: parseInt(idTache, 10), texte: nouveauTexte, modifieur: user };

    fetch("https://corsproxy.io/?http://domo.theo.free.fr/sauvegarde.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())

    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

async function afficherPopupHistoriqueTache(idTache, user){
    fichData = await getUrl("http://domo.theo.free.fr/data_github/data_taches.json");

    const popupHistorique = document.getElementById("popupHistorique");
    const popupContentHistorique = document.getElementById("popup-contentHistorique");
    const fermerPopupHistorique = document.getElementById("fermerPopupHistorique");

    popupHistorique.style.display = "block";

    popupContentHistorique.style.position = "fixed";
    popupContentHistorique.style.minWidth = "300px";
    popupContentHistorique.style.top = "50%";
    popupContentHistorique.style.left = "50%";
    popupContentHistorique.style.transform = "translate(-50%, -80%)";
    popupContentHistorique.style.width = "auto";

    fermerPopupHistorique.onclick = function() {
        closePopupHistorique();
    };

    historiqueTache(idTache, user);
}

function closePopupHistorique(){
    const backContextMenu = document.getElementById("popupHistorique");
    backContextMenu.style.display = "none";    
}

async function historiqueTache(idTache, user) {
    const id = idTache;

    fetch("https://corsproxy.io/?http://domo.theo.free.fr/sauvegarde.php?action=history&id=" + id)
        .then(res => res.json())
        .then(hist => {
            if (!hist || hist.length === 0) {
                document.getElementById("affichagePopupHistorique").innerText = "Aucune modification trouvée.";
            } else {
                let txt = "";
                hist.forEach(h => {
                    if (h.action === "Création") {
                        txt += `${h.date} | ${h.user} a créé la tâche : "${h.texte}"\n`;
                    } else if (h.action === "Modification") {
                        txt += `${h.date} | ${h.user} a modifié : "${h.ancien}" → "${h.nouveau}"\n`;
                    } else if (h.action === "Suppression") {
                        txt += `${h.date} | ${h.user} a supprimé la tâche\n`;
                    }
                });
            document.getElementById("affichagePopupHistorique").innerText = txt;
            }
        }
    );
}

async function findNewFichData() {
    return await getUrl("http://domo.theo.free.fr/data_github/data_taches.json");
}

setInterval(async () => {
    let lastFichData = JSON.parse(localStorage.getItem("lastFichData"));
    //console.log("Ancien :", lastFichData);

    let newFichData = await findNewFichData();
    //console.table(newFichData);

    if (JSON.stringify(newFichData) !== JSON.stringify(lastFichData)) {
        //alert("toto");
        user = localStorage.getItem("user");
        chargerTaches(user);
    }
}, 1000);

function refreshTaches(user) {
    document.getElementById("section_lundi").ineerHTML = null;
    document.getElementById("section_mardi").ineerHTML = null;
    document.getElementById("section_mercredi").ineerHTML = null;
    document.getElementById("section_jeudi").ineerHTML = null;
    document.getElementById("section_vendredi").ineerHTML = null;
    document.getElementById("section_samedi").ineerHTML = null;
    document.getElementById("section_dimanche").ineerHTML = null;

    setTimeout(1000);

    chargerTaches(user);
}
