<?php
    // Include the PHP functions to be used on the page 
    include('../common/common.php');
	
    // Output header and navigation 
    outputHeader("Cube Runner");
    outputBannerNavigation("Home");
?>

<!-- Contents of the page -->
<div class="main-page-wrap">
    <canvas id="canvas"></canvas>
</div>

<script src="game.js" async defer></script>

<!-- Output the footer -->
<?php
    outputFooter();
?>