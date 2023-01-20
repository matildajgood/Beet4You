<?php

require('config.php');
require('autorisieren.php');

// userid muss auch noch übermittelt werden!

$user =  $_POST["user"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$bild = $_POST["bild"];
$beschreibung = $_POST["beschreibung"];
$preis = $_POST["preis"]
$status = $_POST["status"];


$sql = "INSERT INTO wg (titel, bild, adresse, beschreibung, preis, user, status) VALUES (:Titel, :Bild, :Adresse, :Beschreibung, :preis, :User, :Status)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Titel' => $titel, 'Bild' => $bild, 'Adresse' => $adresse, 'Beschreibung' => $beschreibung, 'Preis' => $preis, 'User' => $user, 'Status' => $status));

if ($erfolg) {

    print_r('Artikel erfolgreich erstellt!');

    $letzteID = $pdo->lastInsertId();

} else {

    print_r($erfolg);
};



}
