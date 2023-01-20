<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$beschreibung = $_POST["beschreibung"];
$preis = $_POST["preis"]
$status = $_POST["status"];

$bild = $_POST["bild"];



$sql = "UPDATE inserat SET titel=?, bild=?, adresse=?, beschreibung=?, preis=?, status=? WHERE user=?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$titel, $bild, $adresse, $beschreibung, $status, $userID]);


print_r("Dein Inserat wurde aktualisiert.");
