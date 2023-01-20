var artikelID;

holeUserInserat();


function neuesInserat(){

    let titel = document.querySelector("#titel").value;
    let adresse = document.querySelector("#adresse").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let status = document.querySelector("input[name='status']:checked").value;
    let preis = document.querySelector("#preis").value;

    let formData = new FormData();
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('status', status);
    formData.append('preis', preis);

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('userID', userID);

    //Link von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/neuesInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

        document.querySelector('#nachricht').innerHTML = data;

        })

}

function holeUserInserat() {

    //Variablen zur Authenzifizierung im localstorage holen
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    //let formData = new FormData();
    //formData.append('userID', userID);

    //Link von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/holeUserInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            //Bedingung, wenn Session abgelaufen ist und als Fehler anzeigen
            if (res.status >= 200 && res.status < 300) {

                console.log(res);
                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen, wir leiten dich zum Login weiter.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

            console.log(data);
           //Wenn noch kein Garten mit dem User stimmt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um dein Inserat aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

                // falls es Garten und passender User gibt
            } else {

                // speichert die ID des Gartens in der globalen variable
                InseratID = data[0].ID;

                // zeigt Infotext an
                document.querySelector('#infoText').innerHTML = "Hier hast du die Möglichkeit, dein Inserat zu bearbeiten:"

                // zeigt den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // füllt das Formular mit den Werten der DB aus
                document.querySelector('#titel').value = data[0].artikel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#bild').src = data[0].bild;
                document.querySelector('#preis').value = data[0].preis;

                // setze den korrekten Status (Radiobutton) aus den Infos der DB
                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }
            }
        })
}

function aktualisiereInserat() {

    // Variablen zur Authentifizierung aus localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen
    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let bild = document.querySelector('#bild').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let preis = document.querySelector('#preis').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('preis', preis);
    formData.append('status', status);

    formData.append('InseratID', InseratID);

    //LInk von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/aktualisiereInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            //Bedingung, wenn Session abgelaufen ist
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen, wir leiten dich zum Login weiter.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

        })
}

function loescheInserat() {

    // Variablen zur Authentifizierung im localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('InseratID', InseratID);

    //Link von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/loescheInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // Fehler wenn Session abgelaufen ist
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen, wir leiten dich zum Login weiter.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

            console.log(data);

            document.querySelector('#nachricht').innerHTML = data;

            // button aktualisieren
            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");


            // Formularfelder leeren
            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#preis').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild_vorschau').src = "";

            // Variable leeren
            InseratID = "";
        })
}



// Ausloggen

function logout(){

    localStorage.clear();
    window.location = "../";

}
