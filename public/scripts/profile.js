document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userPhone = localStorage.getItem('userPhone');
    const userIsAdmin = localStorage.getItem('userIsAdmin');

    document.getElementById('userName').innerText = userName;
    document.getElementById('profileName').value = userName;
    document.getElementById('profileEmail').value = userEmail;
    document.getElementById('profilePhone').value = userPhone;

    if (userIsAdmin === 'true') {
        document.getElementById('adminPanelLink').style.display = 'block';
    }

    document.getElementById('profileForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedProfile = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        try {
            const response = await fetch('/api/users/update_profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            if (response.ok) {
                alert('Профіль оновлено успішно!');
                localStorage.setItem('userName', updatedProfile.name);
                localStorage.setItem('userEmail', updatedProfile.email);
                localStorage.setItem('userPhone', updatedProfile.phone);
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Помилка оновлення профілю: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Помилка оновлення профілю:', error);
        }
    });

    var logoutBtn = document.getElementById("logoutBtn"); 

    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.setItem('sessionActive', "false");
        window.location.href = 'index.html';
    });
});
