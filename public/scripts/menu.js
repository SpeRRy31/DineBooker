document.addEventListener("DOMContentLoaded", function() {
    var profileButton = document.querySelector("nav ul li a[href='#acount']");
    
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
