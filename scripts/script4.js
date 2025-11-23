setInterval(loadValue, 1000);

function loadValue() {
    let xhrTemp = new XMLHttpRequest();
    xhrTemp.open("GET", "https://corsproxy.io/?http://domo.theo.free.fr/data_github/temperature_chambre.txt");
    xhrTemp.onreadystatechange = function() {
        if (xhrTemp.readyState === 4 && xhrTemp.status === 200) {
            const tempInt = xhrTemp.responseText;
            document.getElementById('tempInt').textContent = tempInt || "Chargement...";
        }
    };
    xhrTemp.send();

    let xhrHumi = new XMLHttpRequest();
    xhrHumi.open("GET", "https://corsproxy.io/?http://domo.theo.free.fr/data_github/humidite_chambre.txt");
    xhrHumi.onreadystatechange = function() {
        if (xhrHumi.readyState === 4 && xhrHumi.status === 200) {
            const humiInt = xhrHumi.responseText;
            document.getElementById('humiInt').textContent = humiInt || "Chargement...";
        }
    };
    xhrHumi.send();

    let xhrButtonLampeChambre = new XMLHttpRequest();
    xhrButtonLampeChambre.open("GET", "https://corsproxy.io/?http://domo.theo.free.fr/data_github/statut_lampe_chambre.txt");
    xhrButtonLampeChambre.onreadystatechange = function() {
        if (xhrButtonLampeChambre.readyState === 4 && xhrButtonLampeChambre.status === 200) {
            const lampeChambre = xhrButtonLampeChambre.responseText;
            document.getElementById('lampeChambre').textContent = lampeChambre || "Chargement...";
        }
    };
    xhrButtonLampeChambre.send();
}

function updateStatus(place, state) {
  let xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `https://corsproxy.io/?http://domo.theo.free.fr/data_github/update_statuts.php?place=${place}&state=${state}`, true);
  xhr1.onreadystatechange = function() {
      if (xhr1.readyState == 4 && xhr1.status == 200) {
          console.log("Statut mis Ã  jour :", xhr1.responseText);
      }
  };
  xhr1.send();
}
