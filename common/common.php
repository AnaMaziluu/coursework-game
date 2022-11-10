<!-- Ouputs the header for the page and opening body tag -->
<?php
function outputHeader($title){
    echo '<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>' . $title . '</title>
        <link rel="icon" type="image/x-icon" href="./images/logo.png">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">';

        if($title == "Cube Runner"){
            echo '<script src="https://cdn.babylonjs.com/babylon.js"></script>';
            echo '<link rel="stylesheet" href="game.css">';
        } else if ($title == "Cube Runner - Home") {
            echo '<link rel="stylesheet" href="homePage.css">';
        } else if ($title == "Cube Runner - Login") {
            echo '<link rel="stylesheet" href="login.css">';
        } else if ($title == "Cube Runner - Ranking table") {
            echo '<link rel="stylesheet" href="ranking.css">';
        } 
 
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100&display=swap" rel="stylesheet">
    </head>
    <body>';
}

// Ouputs the banner and the navigation bar
// The selected class is applied to the page that matches the page name variable
function outputBannerNavigation($pageName){
    $linkNames = array("Ranking table", "Sign in/ Register");
    $linkAddresses = array("../rankingPage/rankingTable.php", "../loginPage/login.php");
    echo '<div class="navbar">
    <div class="logo">
        <a class="logo-link" href="../homePage/homePage.php"> 
            <img class="logo-image" src="../images/logo.png" target="_blank" alt="logo">
            <p id ="logo-text" class="logo-text">cube runner</p>
        </a>
    </div>';

    echo '<div class="menu">';
    for($x = 0; $x < count($linkNames); $x++){
        echo '<a ';
        if($linkNames[$x] == $pageName){
            echo 'class="selected" ';
        }
        echo 'href="' . $linkAddresses[$x] . '">' . $linkNames[$x] . '</a>';
    }

    echo '</div>';
    echo '</div>';
}

//Outputs footer, closing body tag and closing HTML tag
function outputFooter(){
    echo 
        '<div class="footer">
            <p>ⓒ 2022 Ana Mazilu. All Rights Reserved.</p>
        </div>';

    echo '</body>';
    echo '</html>';
}