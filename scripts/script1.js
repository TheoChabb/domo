emailjs.init('TsfbNCBs576Ka422a');

const firebaseConfig = {
  apiKey: "AIzaSyC9npt7PuRmlNUcPSFQbhQL5lkT3rejNKQ",
  authDomain: "securisation-domotique.firebaseapp.com",
  projectId: "securisation-domotique",
  storageBucket: "securisation-domotique.appspot.com",
  messagingSenderId: "493865233555",
  appId: "1:493865233555:web:25f2adb612c3b98da9b166",
  measurementId: "G-F4KHR48KZR"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Envoi d'un mail automatique pour nouvelle connexion
  const message = `Nouvelle connexion réussie sur votre espace domotique.\nCompte : ${user.email}\nHeure : ${new Date().toLocaleString()}`;
  await sendMail("Nouvelle connexion !", "domo@contact.fr", message, user.email);

  if(user.email == "theo.chabbert.31@gmail.com") {
    username = "Theo";
  }
  if(user.email == "theochbrt@gmail.com") {
    theochbrt = "Admin";
  }
  localStorage.setItem('user', username);
  //alert(user.email);
});

async function logout() {
  const user = auth.currentUser;

  if (user) {
    const msg = `Déconnexion effectuée pour le compte : ${user.email}\nHeure : ${new Date().toLocaleString()}`;
    sendMail("Déconnexion", "domo@contact.fr", msg, user.email).catch(() => {});
  }

  auth.signOut()
    .then(() => window.location.href = "login.html")
    .catch(error => alert("Erreur : " + error.message));
}

document.getElementById("logoutBtn").addEventListener("click", logout);

async function getPublicIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "IP inconnue";
  } catch (e) {
    return "IP inconnue";
  }
}

async function getGeoFromIP(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    if (data && !data.error) {
      const city = data.city || "—";
      const region = data.region || "—";
      const country = data.country_name || "—";
      return `${city}, ${region}, ${country}`;
    }
    return "Localisation IP inconnue";
  } catch (e) {
    return "Localisation IP inconnue";
  }
}

function getBrowserLocation(timeoutMs = 8000) {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      resolve("GPS non disponible");
      return;
    }
    let handled = false;
    const timer = setTimeout(() => {
      if (!handled) {
        handled = true;
        resolve("Permission GPS expirée ou lente");
      }
    }, timeoutMs);

    navigator.geolocation.getCurrentPosition(
      pos => {
        if (handled) return;
        handled = true;
        clearTimeout(timer);
        resolve(`GPS: ${pos.coords.latitude}, ${pos.coords.longitude} (précision ${pos.coords.accuracy}m)`);
      },
      () => {
        if (handled) return;
        handled = true;
        clearTimeout(timer);
        resolve("Permission GPS refusée ou erreur");
      },
      { enableHighAccuracy: false, maximumAge: 60000, timeout: timeoutMs }
    );
  });
}

async function collectDeviceInfo() {
  const ip = await getPublicIP();
  const geoIP = await getGeoFromIP(ip);
  const geoBrowser = await getBrowserLocation();

  const deviceText = 
`Navigateur/OS : ${navigator.userAgent || "—"}
Plateforme : ${navigator.platform || "—"}
Langue : ${navigator.language || "—"}
Résolution écran : ${screen.width}x${screen.height}
Fuseau horaire : ${Intl.DateTimeFormat().resolvedOptions().timeZone || "—"}
IP publique : ${ip}
Localisation (IP) : ${geoIP}
Localisation (navigateur) : ${geoBrowser}`;

  return deviceText;
}

async function sendMail(title, name, message, targetEmail) {
  const serviceID = "default_service";
  const templateID = "template_r2fhmko";
  const deviceText = await collectDeviceInfo();

  const params = {
    title,
    name,
    message: message + "\n\n--- Infos appareil ---\n" + deviceText,
    email: targetEmail
  };

  //return emailjs.send(serviceID, templateID, params)
    //.then(r => { console.log("📧 Mail envoyé", r); return true; })
    //.catch(err => { console.error("Erreur envoi mail:", err); return false; });
}


