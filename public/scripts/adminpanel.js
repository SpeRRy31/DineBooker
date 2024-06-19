document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('addTableModal');
    const btn = document.getElementById('openModalBtn');
    const span = document.getElementsByClassName('close')[0];

    // Відкриття модального вікна при натисканні кнопки
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Закриття модального вікна при натисканні на <span> (x)
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Закриття модального вікна при натисканні за його межами
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('addTableForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        try {
            const response = await fetch('/api/tables/create', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('Table added successfully!');
                // Оновити список столиків або перезавантажити сторінку
                location.reload();
            } else {
                alert('Failed to add table.');
            }
        } catch (error) {
            console.error('Error adding table:', error);
        }
    });
    
    // Отримання всіх столиків при завантаженні сторінки
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('/api/tables');
            const tables = await response.json();
    
            const tableList = document.getElementById('tableList');
            tableList.innerHTML = '';
    
            tables.forEach(table => {
                const listItem = document.createElement('li');
                listItem.textContent = `Столик: ${table.seats} місць, Розташування: ${table.location.hall || table.location.terrace} (${table.location.view}), Тип: ${table.type}, Мінімальне замовлення: ${table.minimumOrder}, Доступність: ${table.availability}`;
                tableList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    });
    
});
