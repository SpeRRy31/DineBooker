document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('addTableModal');
    const btn = document.getElementById('openModalBtn');
    const span = document.getElementsByClassName('close')[0];

    const modalEdit = document.getElementById('editTableModal');
    const spanEdit = document.getElementsByClassName('close-edit')[0];

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
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === modalEdit) {
            modalEdit.style.display = 'none';
        }
    }

    // Відкриття модального вікна редагування
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('edit-btn')) {
            const tableId = event.target.dataset.id;
            openEditModal(tableId);
        }
    });

    // Закриття модального вікна редагування при натисканні на <span> (x)
    if (spanEdit) {
        spanEdit.onclick = function() {
            modalEdit.style.display = 'none';
        }
    }

    // Обробник форми додавання столика
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
                location.reload();
            } else {
                alert('Failed to add table.');
            }
        } catch (error) {
            console.error('Error adding table:', error);
        }
    });

    // Обробник форми редагування столика
    document.getElementById('editTableForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const tableId = formData.get('id');
    
        try {
            const response = await fetch(`/api/tables/${tableId}`, {
                method: 'PUT',
                body: formData
            });
    
            if (response.ok) {
                alert('Table updated successfully!');
                location.reload();
            } else {
                alert('Failed to update table.');
            }
        } catch (error) {
            console.error('Error updating table:', error);
        }
    });

    // Обробник видалення столика
    document.getElementById('deleteTableBtn').addEventListener('click', async () => {
        const tableId = document.getElementById('editTableId').value;
    
        try {
            const response = await fetch(`/api/tables/${tableId}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                alert('Table deleted successfully!');
                location.reload();
            } else {
                alert('Failed to delete table.');
            }
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    });

    // Отримання всіх столиків при завантаженні сторінки
    async function fetchTables() {
        try {
            const response = await fetch('/api/tables');
            const tables = await response.json();
            const tablesGrid = document.getElementById('tablesGrid');
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
                        <p>Зал: ${table.location.hall}</p>
                        <p>Тераса: ${table.location.terrace}</p>
                        <p>Вид: ${table.location.view}</p>
                        <p>Мінімальна сума замовлення: ${table.minimumOrder} грн</p>
                        <p>Доступність: ${table.availability}</p>
                        <button class="edit-btn" data-id="${table._id}">Редагувати</button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    }

    async function openEditModal(tableId) {
        try {
            const response = await fetch(`/api/tables/${tableId}`);
            const table = await response.json();

            const editTableForm = document.getElementById('editTableForm');
            editTableForm.editTableId.value = table._id;
            editTableForm.editSeats.value = table.seats;
            editTableForm.editHall.value = table.location.hall;
            editTableForm.editTerrace.value = table.location.terrace;
            editTableForm.editView.value = table.location.view;
            editTableForm.editType.value = table.type;
            editTableForm.editMinimumOrder.value = table.minimumOrder;

            modalEdit.style.display = 'block';
        } catch (error) {
            console.error('Error opening edit modal:', error);
        }
    }

    fetchTables();
});
