setInterval(loadValue, 1000);

function loadValue() {
    let xhrTemp = new XMLHttpRequest();
    xhrTemp.open("GET", "http://domo.theo.free.fr/data_github/temperature_chambre.txt");
    xhrTemp.onreadystatechange = function() {
        if (xhrTemp.readyState === 4 && xhrTemp.status === 200) {
            const tempInt = xhrTemp.responseText;
            document.getElementById('tempInt').textContent = tempInt || "Chargement...";
        }
    };
    xhrTemp.send();

    let xhrHumi = new XMLHttpRequest();
    xhrHumi.open("GET", "http://domo.theo.free.fr/data_github/humidite_chambre.txt");
    xhrHumi.onreadystatechange = function() {
        if (xhrHumi.readyState === 4 && xhrHumi.status === 200) {
            const humiInt = xhrHumi.responseText;
            document.getElementById('humiInt').textContent = humiInt || "Chargement...";
        }
    };
    xhrHumi.send();
}
