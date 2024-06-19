document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);

            const profileResponse = await fetch('/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                console.log(profileData);
        
                // Збереження ім'я та email у localStorage
                localStorage.setItem('userName', profileData.name);
                localStorage.setItem('userEmail', profileData.email);
                localStorage.setItem('userIsAdmin', profileData.isAdmin);
                
                localStorage.setItem('sessionActive', "true");
            }

            window.location.href = data.redirect;
        } else {
            alert('Login failed.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
