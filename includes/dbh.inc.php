<?php

/*Telling server what kind of database we are trying to connect.
 *to, the host; in which it is localhost.
 */
$dsn = "mysql:host=localhost;dbname=shaggies";
$dbusername = "root";
$dbpword = "";

try {
    /*PhP Data Objects is used when we want to connect to a
     *database.
     */
    $pdo = new PDO($dsn, $dbusername, $dbpword);
    /*Allows us to change attributes about the PDO obj created.
     *For example, how error messages are handled when we connect
     *to a database.
     */
    pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$admin_id = $POST['admin_id'];
$username = $POST['username'];
$pword = $POST['pword'];