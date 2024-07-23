document.getElementById('generateKeyBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/keys/generateKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to generate key');
        }

        const data = await response.json();
        const newKey = data.key;

        const table = document.querySelector('tbody');
        const newRow = table.insertRow();

        const keyCell = newRow.insertCell(0);
        const createdAtCell = newRow.insertCell(1);
        const expiresAtCell = newRow.insertCell(2);
        const activeCell = newRow.insertCell(3);

        keyCell.textContent = newKey.key;
        createdAtCell.textContent = new Date(newKey.creation_date).toLocaleString();
        expiresAtCell.textContent = new Date(newKey.expiration_date).toLocaleString();
        activeCell.textContent = newKey.is_active;
    } catch (err) {
        console.error(err);
        alert('Error generating key');
    }
});
