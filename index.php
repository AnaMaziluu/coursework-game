<?php
    //Include the PHP functions to be used on the page 
    include('common.php'); 
	
    //Output header and navigation 
    outputHeader("Cube Runner - Home");
    outputBannerNavigation("Home");
?>

<!-- Contents of the page -->
<div class="main-page-wrap">
    <div class="main-box">
        <div class="elements-of-box">
            <a href="gamePage.php" class="start-button"><button id="start-button"><span>Start</span></button></a>
            <a href="rankingTable.php" id="ranking-table-button">Ranking table</a>
            <p>Instructions: use the left and and right arrow keys to avoid the cubes. Press P to pause.</p>
        </div>
    </div>
</div>

<script src="index.js" async defer></script>
<?php
    //Output the footer
    outputFooter();
?>