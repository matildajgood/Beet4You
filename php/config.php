<?php

$host = "localhost";
$user = "420149_3_1";
$password = "5CBPSjH4i2cE";
$dbname = "420149_3_1";

$pdo = new PDO('mysql:host='. $host . '; dbname=' . $dbname . ';charset=utf8', $user, $password);
$pdo->exec("set names utf8");
