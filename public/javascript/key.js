document.getElementById('generateKeyBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/keys/generateKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.key) {
            alert('New key generated: ' + data.key);
            location.reload();
        } else {
            alert('Failed to generate key.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error generating key.');
    }
});
