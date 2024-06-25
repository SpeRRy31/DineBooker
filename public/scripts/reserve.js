document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('reserveTableModal');
    const span = document.getElementsByClassName('close')[0];
    const tablesGrid = document.getElementById('tablesGrid');
    let currentPage = 1;

    document.getElementById('applyFilters').addEventListener('click', () => fetchTables(1));

    // Закриття модального вікна при натисканні на <span> (x)
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Закриття модального вікна при натисканні за його межами
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Відкриття модального вікна резервування
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('reserve-btn')) {
            const tableId = event.target.dataset.id;
            openReserveModal(tableId);
        }
    });

    // Обробник форми резервування столика
    document.getElementById('reserveTableForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        try {
            const response = await fetch('/api/reservations/create', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('Table reserved successfully!');
                modal.style.display = 'none';
            } else {
                alert('Failed to reserve table.');
            }
        } catch (error) {
            console.error('Error reserving table:', error);
        }
    });

    // Отримання всіх столиків при завантаженні сторінки
    async function fetchTables(page) {
        currentPage = page || 1;

        const sort = document.getElementById('sortOptions').value;
        const filterSeats = document.getElementById('filterSeats').value;
        const filterType = document.getElementById('filterType').value;
        const filterHall = document.getElementById('filterHall').value;
        const filterTerrace = document.getElementById('filterTerrace').value;
        const filterView = document.getElementById('filterView').value;
        const filterAvailability = document.getElementById('filterAvailability').value;

        const filters = {};
        if (filterSeats) {
            filters.seats = filterSeats;
        }
        if (filterType) {
            filters.type = filterType;
        }
        if (filterHall) {
            filters.location = filters.location || {};
            filters.location.hall = filterHall;
        }
        if (filterTerrace) {
            filters.location = filters.location || {};
            filters.location.terrace = filterTerrace;
        }
        if (filterView) {
            filters.location = filters.location || {};
            filters.location.view = filterView;
        }
        if (filterAvailability) {
            filters.availability = filterAvailability;
        }

        const queryParams = new URLSearchParams({ sort, page, ...filters });

        try {
            const response = await fetch(`/api/tables?${queryParams.toString()}`);
            const data = await response.json();
            tablesGrid.innerHTML = '';

            if (data.tables.length === 0) {
                tablesGrid.innerHTML = '<p>Немає доступних столиків.</p>';
            } else {
                data.tables.forEach(table => {
                    const tableCard = document.createElement('div');
                    tableCard.classList.add('table-card');
                    tableCard.innerHTML = `
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
                                <button class="reserve-btn" data-id="${table._id}">Резервувати</button>
                            </div>
                        </div>
                    `;
                    tablesGrid.appendChild(tableCard);
                });
            }

            document.getElementById('currentPage').textContent = currentPage;
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = data.totalPages === currentPage;
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    }

    // Відкриття модального вікна резервування столика
    function openReserveModal(tableId) {
        document.getElementById('reserveTableId').value = tableId;
        modal.style.display = 'block';
    }

    document.getElementById('prevPage').addEventListener('click', () => fetchTables(currentPage - 1));
    document.getElementById('nextPage').addEventListener('click', () => fetchTables(currentPage + 1));

    fetchTables(currentPage);
});
