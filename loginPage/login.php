<?php
    //Include the PHP functions to be used on the page 
    include('../common/common.php');

    //Output header and navigation 
    outputHeader("Cube Runner - Login");
    outputBannerNavigation("Sign in/ Register");
?>


<!-- Contents of the page -->
<div class="main-page-wrap">
    <div class="login-wrap">
        <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>

            <div class="login-form">
                <form>
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="user" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" checked>
                            <label for="check"><span class="icon"></span> Keep me Signed in</label>
                        </div>
                        <div class="group">
                            <input type="submit" class="button" onclick="onLoginSubmit()" value="Sign In">
                        </div>
                    </div>
                </form>
                <form>
                    <div class="sign-up-htm">
                        <div class="group">
                            <label for="userSignup" class="label">Username</label>
                            <input id="userSignup" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="passSignup" class="label">Password</label>
                            <input id="passSignup" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <label for="pass2Signup" class="label">Repeat Password</label>
                            <input id="pass2Signup" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <label for="emailSignup" class="label">Email Address</label>
                            <input id="emailSignup" type="text" class="input">
                        </div>
                        <div class="group">
                            <input type="submit" class="button" onclick="onSignupSubmit()" value="Sign Up">
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <label for="tab-1">Already Member?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<script src="login.js"></script>


<!-- //Output the footer -->
<?php
    outputFooter();
?>