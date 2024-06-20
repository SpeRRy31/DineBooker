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
    async function fetchTables() {
        try {
            const response = await fetch('/api/tables');
            const tables = await response.json();
            tablesGrid.innerHTML = tables.map(table => `
                <div class="table-card">
                    <img src="${table.image}" alt="Table Image">
                    <div class="info">
                        <h3>Місць: ${table.seats}</h3>
                        <p>${table.availability}</p>
                    </div>
                    <div class="extra-info">
                        <h3 class="extra-header">Місць: ${table.seats}</h3>
                        <p>Тип: ${table.type}</p>
                        <p>Коридор: ${table.location.hall}</p>
                        <p>Тераса: ${table.location.terrace}</p>
                        <p>Вид: ${table.location.view}</p>
                        <p>Мінімальна сума замовлення: ${table.minimumOrder} грн</p>
                        <p>Доступність: ${table.availability}</p>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    }
    fetchTables();
    
});
