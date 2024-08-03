document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form');
    const viewEntriesButton = document.getElementById('view-entries-button');
    const searchForm = document.getElementById('search-form');
    const updateForm = document.getElementById('update-form');
    const deleteForm = document.getElementById('delete-form');
    const entriesList = document.getElementById('entries-list');
    const alerts = document.getElementById('alerts');

    // Create entry
    entryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(entryForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                showAlert('Entry created successfully!', 'success');
                entryForm.reset(); // Clear the form after submission
            } else {
                showAlert('Failed to create entry.', 'error');
            }
        } catch (error) {
            showAlert('An error occurred.', 'error');
        }
    });

    // View entries
    viewEntriesButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/entries');
            if (response.ok) {
                const entries = await response.json();
                displayEntries(entries);
            } else {
                showAlert('Failed to fetch entries.', 'error');
            }
        } catch (error) {
            showAlert('An error occurred.', 'error');
        }
    });

    // Search entries
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(searchForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const query = new URLSearchParams(data).toString();
            const response = await fetch(`/api/entries/search?${query}`, {
                method: 'GET'
            });
            if (response.ok) {
                const entries = await response.json();
                displayEntries(entries);
            } else {
                showAlert('Failed to search entries.', 'error');
            }
        } catch (error) {
            showAlert('An error occurred.', 'error');
        }
    });

    // Update entry
    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(updateForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/entries/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: data.date,
                    text: data.text,
                    category: data.category
                })
            });
            if (response.ok) {
                showAlert('Entry updated successfully!', 'success');
                updateForm.reset(); // Clear the form after update
            } else {
                showAlert('Failed to update entry.', 'error');
            }
        } catch (error) {
            showAlert('An error occurred.', 'error');
        }
    });

    // Delete entry
    deleteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(deleteForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/entries/${data.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                showAlert('Entry deleted successfully!', 'success');
                deleteForm.reset(); // Clear the form after delete
            } else {
                showAlert('Failed to delete entry.', 'error');
            }
        } catch (error) {
            showAlert('An error occurred.', 'error');
        }
    });

    function displayEntries(entries) {
        entriesList.innerHTML = '';
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.date}: ${entry.text} (Category: ${entry.category})`;
            entriesList.appendChild(li);
        });
    }

    function showAlert(message, type) {
        alerts.innerHTML = `<div class="alert ${type}">${message}</div>`;
        setTimeout(() => {
            alerts.innerHTML = '';
        }, 5000);
    }
});


