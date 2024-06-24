<?php

//Create if-statement to check for superglobal
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    /*If we did access the page legitimately, then we want
     *to grab user data.
     */
    $admin_id = $_POST["admin_id"];
    $username = $_POST["username"];
    $pword = $_POST["pword"];

    try {
        //Grabbing connection to database because we have it in dbh.inc.php file.
        require_once "dbh.inc.php";

        //Creating query to send inside database to INSERT data.
        $query = "INSERT INTO administrator (admin_id, username, pword) VALUES (?, ?, ?);";

        //Create prepared statement to query this query inside database.
        $stmt = $pdo->prepare($query);

        //Submit user data using array
        $stmt->execute([$admin_id,  $username, $pword]);

        $pdo = null;
        $stmt = null;

        header("Location: ../login.php");
        
        exit();
    } catch (PDOException $e) {
        /*If something goes wrong when we try to INSERT this 
         *data into the website, we want to output an error
         *message.
         */
        /*Die function that terminates script, stops it from
         *running and output error message.
         */
        exit("Query failed: " . $e->getMessage());
    }
} else {
    //Send user back to front page.
    header("Location: ../login.php");
    exit();
}