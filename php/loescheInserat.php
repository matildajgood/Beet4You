<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$inseratID = $_POST["inseratID"];

$sql = "DELETE FROM inserat WHERE user = ? AND ID = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $wgID]);

print_r("Dein Inserat wurde gelöscht.");
