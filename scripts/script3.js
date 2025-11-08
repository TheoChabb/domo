async function getUrl(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return(data);
    } catch (error) {
        return("Erreur in get URL : " + url);
    }
}


async function afficherPage(utilisateur) {
fichUser = await getUrl("data/users.json");
        user = fichUser[utilisateur].name;
        localStorage.setItem("user", user);

        fichMainData = await getUrl("data/main_data.json");
        
        for(elementPage of fichMainData.elements){
            id = elementPage;
            document.getElementById("section_tache").innerHTML = document.getElementById("section_tache").innerHTML + '<div id="' + id + '" class="' + id + '"></div>';
            dataElementPage = fichMainData[elementPage];
            for(element in dataElementPage){
                
                if(dataElementPage[element].type == "popup"){
                    id = dataElementPage[element].id;
                    style = dataElementPage[element].style;

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<div id="' + id + '" class="' + style + '"></div>';

                    for(element2 in dataElementPage[element].value){
                        if(element2 == "titre"){
                            value = dataElementPage[element].value[element2];
                            document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<h3>' + value + '</h3>';
                        }
                        
                        if(element2.includes("label")){
                            value = dataElementPage[element].value[element2].value;
                            document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<label>' + value + '</label>';
                        }
                        
                        if(element2.includes("input")){
                            type = dataElementPage[element].value[element2].type;
                            if(type == "text"){
                                idInput = dataElementPage[element].value[element2].id;
                                document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<input id="' + idInput + '" type="' + type + '"/>';
                            }
                            if(type == "pre"){
                                idInput = dataElementPage[element].value[element2].id;
                                document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<pre id="' + idInput + '"></pre>';
                            }
                            }

                        if(element2 == "div"){
                            style = dataElementPage[element].value[element2].style;
                            idDiv = dataElementPage[element].value[element2].id;
                            document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<div id="' + idDiv + '" class="' + style + '"></div>';

                            for(element3 in dataElementPage[element].value[element2].value){
                                if(element3.includes("bouton")){
                                    idBouton = dataElementPage[element].value[element2].value[element3].id;
                                    value = dataElementPage[element].value[element2].value[element3].value;

                                    document.getElementById(idDiv).innerHTML = document.getElementById(idDiv).innerHTML + '<button id="' + idBouton + '">' + value + '</button>';
                                }
                            }
                        }
                    }
                }
                
                if(dataElementPage[element].type == "list"){
                    idParent = dataElementPage[element].id;
                    style = dataElementPage[element].style;

                    document.getElementById(id).innerHTML = '<ul id="ul_' + id + '"></ul>';
                    
                    for(option in dataElementPage[element].option){
                        idFils = dataElementPage[element].option[option].id;
                        value = dataElementPage[element].option[option].value;

                        document.getElementById("ul_" + elementPage).innerHTML = document.getElementById("ul_" + elementPage).innerHTML + '<li id="' + idFils + '">' + value + '</li>';
                    }
                }

                
                if(dataElementPage[element].type == "span"){
                    id = dataElementPage[element].id;
                    style = dataElementPage[element].style;
                    if(fichUser[utilisateur].titre !== undefined){
                        titre = fichUser[utilisateur].titre;
                    }else{
                        titre = "";
                    }

                    if(dataElementPage[element].type2 !== null){
                        if(dataElementPage[element].type2.type = "a"){
                            href = dataElementPage[element].type2.href;
                            url = "index.html" + "?utilisateur=" + utilisateur + "&cle=" + cle + "&page=" + href;
                            style2 = dataElementPage[element].type2.style;
                            user = '<a href="' + url + '" class="' + style2 + '">' + user + '</a>'
                        }
                    }

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<span id="' + id + '" class="' + style + '">' + titre + user + '</div>';
                }
                
                if(dataElementPage[element].type == "text"){
                    id = dataElementPage[element].id;
                    titre = dataElementPage[element].titre;
                    style = dataElementPage[element].style;

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<span id="' + id + '" class="' + style + '">' + titre + '</div>';
                }

                
                if(dataElementPage[element].type == "entreText"){
                    id = dataElementPage[element].id;
                    placeholder = dataElementPage[element].placeholder;
                    style = dataElementPage[element].style;
                    onkey_down = "envoyer(event, '" + dataElementPage[element].onkey_down + "', '" + utilisateur + "')";

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<input id="' + id + '" class="' + style + '" type="text" placeholder="' + placeholder + '" onkeydown="' + onkey_down + '"/>';
                }

                
                if(dataElementPage[element].type == "select"){
                    id = dataElementPage[element].id;
                    style = dataElementPage[element].style;
                    onkey_down = "envoyer(event, '" + dataElementPage[element].onkey_down + "', '" + utilisateur + "')";

                    if(id == "selectColonne"){
                        document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<select id="' + id + '" class="' + style + '" onkeydown="' + onkey_down + '"></select>';

                        dataColonnes = fichMainData.body;
                        for(colonne in dataColonnes){
                            colonneName = dataColonnes[colonne].name;
                            value = dataColonnes[colonne].id;

                            document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + '<option value="' + value + '">' + colonneName + '</option>';
                        }
                    }
                }

                if(dataElementPage[element].type == "bouton"){
                    id = dataElementPage[element].id;
                    style = dataElementPage[element].style;
                    value = dataElementPage[element].value;
                    on_click = dataElementPage[element].on_click + "('" + utilisateur + "')";

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<button id="' + id + '" style="' + style + '" onclick="' + on_click + '">' + value + '</button>';
                }

                if(element.includes("section")){
                    id = dataElementPage[element].id;
                    style = dataElementPage[element].style;
                    value = dataElementPage[element].name;
                    idColonne = "section_" + id;

                    document.getElementById(elementPage).innerHTML = document.getElementById(elementPage).innerHTML + '<section class="' + style + '" id="' + id + '"><header><h2>' + value + '</h2><span class="count" id="count_section_' + id + '">0</span></header><div id="' + idColonne + '" class="dropzone" data-col="' + id + '"></div></section>';
                }
            }
        }
        chargerTaches(utilisateur);
}

async function chargerTaches(user){
    for(section in fichMainData.body){
        idSection = "section_" + fichMainData.body[section].id;
        document.getElementById(idSection).innerHTML = null;
    }

    fichData = await getUrl("data/data_taches.json");

    localStorage.setItem("lastFichData", JSON.stringify(fichData));

    for(tache in fichData){
        bgColor = "background-color: " + fichUser[fichData[tache].user].color + ";";
        utilisateurMaj = fichUser[fichData[tache].user].name;
        colonneTache = "section_" + fichData[tache].colonne;
        idTache = fichData[tache].id;
        valueElement = fichData[tache].texte;
        //console.log("Bg : " + bgColor + "\nUser : " + utilisateurMaj + "\nColonne : " + colonneTache + "\nId : " + idTache + "\nTexte : " + valueElement + "\n");

        divTache = '<div class="tache" style="' + bgColor + '" draggable="true" data-id="' + idTache + '" data-user="' + user + '" style="" oncontextmenu="afficherContextMenu(' + idTache + ', event, \'' + user + '\'); return false;" >' + 
                        '<strong class="title">' + valueElement + '</strong>' + 
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

    fetch("sauvegarde.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    })
    .then(res => res.text())
        .then(msg => {
        if (msg) {
            alert(msg);
        }});
    document.getElementById("nomTache").value = "";
}
}

function supprimerTache(id, user) {
    const userSupp = user;

    const data = { action: "delete", id: parseInt(id, 10), user: userSupp };

    fetch("sauvegarde.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        if (msg) {
            alert(msg);
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
    fichData = await getUrl("data/data_taches.json");
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
    fichData = await getUrl("data/data_taches.json");

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

    fetch("sauvegarde.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())

    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

async function afficherPopupHistoriqueTache(idTache, user){
    fichData = await getUrl("data/data_taches.json");

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

    fetch("sauvegarde.php?action=history&id=" + id)
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
    return await getUrl("data/data_taches.json");
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
