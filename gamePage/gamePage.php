<?php
    // Include the PHP functions to be used on the page 
    include('../common/common.php');
	
    // Output header and navigation 
    outputHeader("Cube Runner");
    outputBannerNavigation("Home");
?>

<!-- Contents of the page -->
<div class="main-page-wrap" >
    <canvas id="canvas">

    </canvas>
    <div id="score" style="position: relative; z-index: 1; padding: 50x; color: green; margin-top: 10px; font-size: 40px; text-align: center">
            Score
    </div>
</div>

<script src="game.js"></script>

<!-- Output the footer -->
<?php
    outputFooter();
?>