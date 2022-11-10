<?php
    //Include the PHP functions to be used on the page 
    include('../common/common.php');
	
    //Output header and navigation 
    outputHeader("Cube Runner - Home");
    outputBannerNavigation("Home");
?>

<!-- Contents of the page -->
<div class="main-page-wrap">
    <div class="main-box">
        <div class="elements-of-box">
            <a class="start-button">
                <button id="start-button" class="start-button" onclick="onStartButtonClicked()">
                    <span>Start</span>
                </button>
            </a>
            <a href="../rankingPage/rankingTable.php" id="ranking-table-button">Ranking table</a>
            <p>Instructions: use the left and and right arrow keys to avoid the cubes. Press P to pause.</p>
        </div>
    </div>
</div>

<script src="homePage.js" type="module"></script>

<!-- Output the footer -->
<?php
    outputFooter();
?>