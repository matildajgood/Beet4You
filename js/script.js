holeUser();

holeInserat();

function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');



    //Link von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

    //Wenn Sitzung noch läuft, soll JSON Antwort funktionieren
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen, wir leiten dich zum Login weiter.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            document.querySelector("#username").innerHTML = data[0].name;


        })

}

function holeInserat() {

    console.log ("Garten ist vorhanden");

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    //Link von Marions Server
    fetch("https://420149-3.web.fhgr.ch/php/holeInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

    //Wenn Sitzung noch läuft, soll JSON Antwort funktionieren
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen, wir leiten dich zum Login weiter.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);
            InseratAnzeigen(data);
        })

}





function InseratAnzeigen(data) {

    data.forEach(Inserat => {


        if (parseInt(Inserat.status)) {

            Inserat.status = '🟢';

        } else {

            Inserat.status = "🔴"

        }


        let InseratContainer = document.createElement("div");
        InseratContainer.innerHTML =

            '<div class="Inserat">' +
            '<h2>' + Inserat.status + ' ' + Inserat.titel + '</h2>' +
            '<img class="Garten-image" src="' + Inserat.bild + '">' +
            '<p>' + Inserat.beschreibung + '</p>' +
            '<p>' + Inserat.adresse + '</p>' +
            '</div>'

            //Liste Namen anpassen
        document.getElementById("liste-inserat").appendChild(InseratContainer);

    })
}
    function logout(){

        localStorage.clear();
        window.location = "/login.html";
}
