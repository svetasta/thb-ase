//script.js
function domContentLoaded() {
    return new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}

domContentLoaded().then(() => {
    // Check the URL on page load
    checkPath();

    // Handle browser back/forward buttons
    window.onpopstate = function (event) {
        checkPath();
    };
});

// check what url is in serach field of window and call functions to creaate specified html 
function checkPath(){
    const path = window.location.pathname;
    console.log("URL "+path)
    if (path=== '/') {
        console.log('at home'+ window.location.pathname);
         switchToHome();
     } 
    if (path=== '/registration') {
        console.log('at reg'+ window.location.pathname);
         switchToRegistration();
     } 
};
// create html of the home page
function switchToHome(){
    console.log('Switching to Home');
    document.getElementById('content').innerHTML = '';
    const accordion=document.createElement('div')
    accordion.className = 'accordion';
    document.getElementById('content').appendChild(accordion)
    getQuestions()
    history.pushState({}, '', '/');

};


//create register form in html
function switchToRegistration() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = `
        <h2>Registration</h2>
        <form id="registrationForm" onsubmit="submitForm(event)">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Register</button>
        </form>
    `;
    history.pushState({}, '', '/registration');
};
// get the data from input field of register form and call the function to send them as json  
function submitForm(event) {
    event.preventDefault();
    // Get the new username and password from HTML
    const newUsername = document.getElementById('name').value;
    const newUserpassword = document.getElementById('password').value;
    console.log(newUsername, newUserpassword);
    const newUserdata = { newUsername, newUserpassword };

    // Send a POST request to the server   
    sendRegistrationData(newUserdata)
    .then(userDataOnServer => {
        // The response from server here
        console.log (userDataOnServer.user);

        // Log additional information
        console.log("html");

        // Update the content in HTML on successful registration
        document.getElementById('content').innerHTML = `<h2>Registration Successful! We are glad to greet you,  ${userDataOnServer.user}</h2>`;
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

}
    

// the function to fetch the newUserdata with Post to server 
/*function sendRegistrationData(data) {
    console.log( data )
    return new Promise((resolve, reject) => {
        const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        fetch('/register',options) 
        .then(response => {
            if (!response.ok) {
                throw new Error(`MyServer error: ${response.status}`);
            
            }
            return response.json();
          })
        .then(data => resolve(data))
        .catch(error => reject(`Failed to send registration data: ${error.message}`));
      });
  }*/
    


    async function sendRegistrationData(data) {
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
                throw new Error(`Server responded with status: ${response.status}`);
            }
    
            const userJson = await response.json();
            return userJson;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    
    function getQuestions() {
        // Your fetch logic for questions
        fetch('/answered_questions')
            .then(response => response.json())
            .then(data => {
                createAccordionItems(data);
            })
            .catch(error => console.error('Error:', error));
    }

    function createAccordionItems(data) {
        
        const accordion = document.querySelector('.accordion');
        accordion.innerHTML = ''; // Clear existing content

        data.forEach(item => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';

            const accordionButton = document.createElement('button');
            accordionButton.className = 'accordion-button';
            accordionButton.onclick = function() { toggleAccordion(this); };
            accordionButton.innerHTML = item.text;

            const accordionContent = document.createElement('div');
            accordionContent.className = 'accordion-content';
            accordionContent.innerHTML = `<p>${item.answer}</p>`;

            accordionItem.appendChild(accordionButton);
            accordionItem.appendChild(accordionContent);

            accordion.appendChild(accordionItem);
        });
    }

    function toggleAccordion(button) {
        const content = button.nextElementSibling;
        // content.style.display = content.style.display === 'block' ? 'none' : 'block';
        button.children[1].classList.toggle('rotate');
    }