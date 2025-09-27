    // Config Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyC9npt7PuRmlNUcPSFQbhQL5lkT3rejNKQ",
      authDomain: "securisation-domotique.firebaseapp.com",
      projectId: "securisation-domotique",
      storageBucket: "securisation-domotique.appspot.com",
      messagingSenderId: "493865233555",
      appId: "1:493865233555:web:25f2adb612c3b98da9b166",
      measurementId: "G-F4KHR48KZR"
    };

    // Init Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const functions = firebase.functions();

    const dataDiv = document.getElementById("data");

    // Vérifie si l’utilisateur est connecté
    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "login.html";
      } else {
        loadData(user);
      }
    });

    // Déconnexion
    document.getElementById("logoutBtn").addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "login.html";
      });
    });

    // Chargement des données Firestore
    function loadData(user) {
      db.collection("capteurs").get()
        .then(snapshot => {
          if (snapshot.empty) {
            dataDiv.innerHTML = "Aucune donnée trouvée.";
            return;
          }
          let html = "<h3>Données des capteurs :</h3><ul>";
          snapshot.forEach(doc => {
            const d = doc.data();
            html += `<li><b>${doc.id}</b> : ${JSON.stringify(d)}</li>`;
          });
          html += "</ul>";
          dataDiv.innerHTML = html;
        })
        .catch(error => {
          console.error("Erreur Firestore:", error);
          dataDiv.innerHTML = "Erreur lors du chargement des données.";
        });
    }

    // Bouton "Envoyer un mail"
    document.getElementById("sendMailBtn").addEventListener("click", () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Utilisateur non connecté !");
        return;
      }

      // Simuler l'envoi de mail (pour test)
      alert("Mail envoyé à " + user.email + " (simulation)");

      // ✅ Option réelle : si tu as une Cloud Function
      /*
      const sendMail = functions.httpsCallable('sendMailToUser');
      sendMail({ subject: "Domotique", text: "Hello " + user.email })
        .then(result => { alert("Mail envoyé !"); })
        .catch(error => { alert("Erreur : " + error.message); });
      */
    });
  </script>
