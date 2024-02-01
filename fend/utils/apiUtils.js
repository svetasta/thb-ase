




/*async function sendRegistrationData(data) {
    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch('/register', options);

        if (!response.ok) {
            throw new Error(`MyServer responded with status: ${response.status}`);
        }

        const userJson = await response.json();
        return userJson;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function sendLoginData(data) {
   console.log("login data sending")

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch('/login', options);

    //    if (!response.ok) {
    //      throw new Error(`LoginServer responded with status: ${response.status}`);
     //   }

        const userJson = await response.json();
        return userJson;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function uploadImage() {
    const form = document.getElementById('uploadForm');
    const input = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');

    const formData = new FormData(form);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            resultDiv.innerHTML = `<p>Image uploaded successfully. Image URL: ${result.imageUrl}</p>`;
        } else {
            const error = await response.text();
            resultDiv.innerHTML = `<p>Error: ${error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p>An unexpected error occurred.</p>`;
    }
}
export {sendRegistrationData, sendLoginData, uploadImage}*/