<?php
    //Include the PHP functions to be used on the page 
    include('../common/common.php');
	
    //Output header and navigation 
    outputHeader("Cube Runner - Ranking table");
    outputBannerNavigation("Ranking table");
?>

<!-- Contents of the page -->
<div class="main-page-wrap">
    
    <!-- Ranking table -->

    <table class="table">
    <caption>Ranking table</caption>
        <thead>
            <tr>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Dom</td>
                <td>6000</td>
            </tr>
            <tr class="active-row">
                <td>Melissa</td>
                <td>5150</td>
            </tr>
            <tr>
                <td>Andrei</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Catalina</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Laura</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Ovi</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Marc</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Bob</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Michael</td>
                <td>6000</td>
            </tr>
            <tr>
                <td>Kelly</td>
                <td>6000</td>
            </tr>
        </tbody>
    </table>
</div>

<script src="./rankingTable.js" type="module"></script>

<!-- //Output the footer -->
<?php
    outputFooter();
?>