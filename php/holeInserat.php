<?php

require("config.php");
require("autorisieren.php");

$sql = "

SELECT I.ID, I.titel, I.bild, I.adresse, I.beschreibung, I.preis, U.name, U.email, I.status, I.timestamp
FROM inserat I
INNER JOIN user U
ON I.user = U.ID
ORDER BY I.timestamp DESC;

";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}
