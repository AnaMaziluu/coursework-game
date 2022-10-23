<?php

//Ouputs the header for the page and opening body tag
function outputHeader($title){
    echo '<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>' . $title . '</title>
        <link rel="icon" type="image/x-icon" href="./images/logo.png">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100&display=swap" rel="stylesheet">
    </head>
    <body>';
}

/* Ouputs the banner and the navigation bar
    The selected class is applied to the page that matches the page name variable */
function outputBannerNavigation($pageName){
    //Output banner and first part of navigation
    $linkNames = array("Ranking table", "Sign in/ Register");
    $linkAddresses = array("rankingTable.php", "login.php");
    echo '<div class="navbar">
    <div class="logo">
        <a class="logo-link" href="index.php"> 
            <img class="logo-image" src="./images/logo.png" target="_blank" alt="logo">
            <p id ="logo-text" class="logo-text">cube runner</p>
        </a>
    </div>';

    for($x = 0; $x < count($linkNames); $x++){
        echo '<a ';
        if($linkNames[$x] == $pageName){
            echo 'class="selected" ';
        }
        echo 'href="' . $linkAddresses[$x] . '">' . $linkNames[$x] . '</a>';
    }

    echo '</div>';
}

//Outputs closing body tag and closing HTML tag
function outputFooter(){
    echo 
        '<div class="footer">
            <p>ⓒ 2022 Ana Mazilu. All Rights Reserved.</p>
        </div>';

    echo '</body>';
    echo '</html>';
}

