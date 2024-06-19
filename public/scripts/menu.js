document.addEventListener("DOMContentLoaded", function() {
    /* var homeButton = document.querySelector("nav ul li a[href='#home']");
    var reserveButton = document.querySelector("nav ul li a[href='#reserve']");
    var contactButton = document.querySelector("nav ul li a[href='#contact']"); */
    var profileButton = document.querySelector("nav ul li a[href='#acount']");
    

/*     function loadContent(file, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("main").innerHTML = this.responseText;
                if (callback) callback(); 
            }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
    } */
/* 
    homeButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("head.html");
    });

    reserveButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("reserve.html");
    }); */
/* 
    contactButton.addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("contact.html");
    }); */

    function isSessionActive() {
        return localStorage.getItem('sessionActive') === 'true';
      }
    
      profileButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("123");
        if (isSessionActive()) {
          window.location.href = 'profile.html';
        } else {
          window.location.href = 'login.html';
        }
      });


});
