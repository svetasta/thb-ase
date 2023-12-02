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

function submitForm(event) {
    event.preventDefault();
    
    const newUsername = document.getElementById('name').value;
    const newUserpassword = document.getElementById('password').value;
    sendRegistrationData({ newUsername, newUserpassword });
    console.log ('run function sendRegistrationData', { newUsername, newUserpassword });
    // Perform the POST request to '/register' with name and password
    // You can use Fetch API or any other method to send the data to the server
    // For simplicity, let's just log the data for now
    document.getElementById('content').innerHTML = '<h2>Registration Successful!</h2>';
};

function sendRegistrationData ({ newUsername, newUserpassword }) {
  
    console.log ('Sending data to /register:', { newUsername, newUserpassword });
};

//Fetch and display questions when the page loads
   /* document.addEventListener('DOMContentLoaded', function() {
      console.log("i an listening");
        checkPath();
    });*/
    

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