document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо елементи кнопок навігації
    var homeButton = document.querySelector("nav ul li a[href='#home']");
    var reserveButton = document.querySelector("nav ul li a[href='#reserve']");
    var contactButton = document.querySelector("nav ul li a[href='#contact']");
    var profileButton = document.querySelector("nav ul li a[href='#acount']");

    // Функція для завантаження та вставки вмісту з файлу
    function loadContent(file) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("main").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
    }

    // Додаємо обробники подій для кліків на кнопки навігації
    homeButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("head.html");
    });

    reserveButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("reserve.html");
    });

    contactButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("contact.html");
    });

    profileButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("profile btn");
        checkSession();
    });

    function checkSession() {
        
        console.log("chekses func");
        fetch('/session')
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    console.log("profile html");
                    loadContent('profile.html');
                } else {
                    console.log("login html");
                    loadContent('login.html');
                }
            });
    }
});
