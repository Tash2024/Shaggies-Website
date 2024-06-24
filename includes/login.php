<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title></title>
    <!--Connected HTML file to CSS with this line of code.-->
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="hero">
        <div class="form-box">
            <!--Come to form-box and create one div & class name button-box.-->
            <div class="button-box">
            </div>
            <h1 class="title">Admin</h1>
            <div class="social-icons">
                <img src="img/twitter.jpg" alt=" ">
                <img src="img/facebook.jpg" alt=" ">
                <img src="img/google.jpg" alt=" ">
            </div>
             <!--Submit data to PhP file.-->
             <!--Using POST method to submit data.-->
            <form action="includes/formhandler.inc.php" method="post">
                <input type="text" class="input-field" placeholder="Admin ID" required>
                <input type="text" class="input-field" placeholder="Username" required>
                <input type="password" class="input-field" placeholder="Enter Password" required>
                <input type="checkbox" class="check-box"><span>Remember Password</span>
                <button type="submit" class="submit-btn">Log In</button>
            </form>
        </div>
    </div>
    <script>

        function redirectToAdminPage(event) {
            event.preventDefault();

            var id = document.querySelector('.input-field[placeholder="Admin ID"').value;
            var username = document.querySelector('.input-field[placeholder="Username"').value;
            var password = document.querySelector('.input-field[placeholder="Enter Password"').value;

            if (id && username && password) {
                window.location.href = "Admin.html";
            } else {
                if (!id || !username || !password) {
                    alert("Please ensure that all fields are filled in.");
                }
            }
        }

        document.querySelector('.submit-btn').addEventListener("click", redirectToAdminPage);
    </script>
</body>
</html>