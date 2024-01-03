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
     if (path=== '/login') {
        console.log('at reg'+ window.location.pathname);
         switchToLogin();
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
function createForm(){
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = `
    <div class="form-body">
    <div class="row">
        <div class="form-holder">
            <div class="form-content">
                <div class="form-items">
                    <h3 id= "titelToForm">Register Today</h3>
                    <p id = "labelToForm">Fill in the data below.</p>
                        <form id="registrationForm" onsubmit="submitForm(event)">
                            <label for="name">Name:</label>
                            <div class="col-md-12">
                                <input  id="name" class="form-control" type="text" name="name" placeholder=" Name" required>
                            </div><br>
                            <label for="password">Password:</label>
                            <div class="col-md-12">
                            <input id ="password"class="form-control" type="password" id="password" name="password" placeholder="Password"required>
                            </div><br>
                            <label for="email">Email adress:</label>
                            <div class="col-md-12">
                            <input id = "email" class="form-control" type="password"  name="email" placeholder=" your email"required>
                            </div><br>
                            <div class="form-button mt-3">
                                <button id="submit" type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form> 
                 </div>
            </div>
         </div>
    </div>
    </div>  
    `;
}


//create register form in html
function switchToRegistration() {
    createForm();
    
    history.pushState({}, '', '/registration');
};
function switchToLogin() {
    createForm();
    // Get the button element by its id
  const submitButton = document.getElementById('submit');
  // Change the text content
  submitButton.textContent = 'Login';
  const labelToForm= document.getElementById('labelToForm');
  labelToForm.textContent = "login here below" ;
  const titelToForm= document.getElementById('titelToForm');
  titelToForm.textContent = "Are you a registered member? " 
    history.pushState({}, '', '/login');
};
// get the data from input field of register form and call the function to send them as json  
function submitForm(event) {
    event.preventDefault();
    // Get the new username and password from HTML
    const newUsername = document.getElementById('name').value;
    const newUserpassword = document.getElementById('password').value;
    const newUseremail = document.getElementById('email').value;
    console.log(newUsername, newUserpassword,newUseremail);
    const newUserdata = { newUsername, newUserpassword, newUseremail};

    // Send a POST request to the server   
    sendRegistrationData(newUserdata)
    .then(userDataOnServer => {
        // The response from server here
        console.log (userDataOnServer.usern);

        // Log additional information
        console.log("html");

        // Update the content in HTML on successful registration
        document.getElementById('content').innerHTML = `<div class= "greeting">
                                                            <div class="greeting-conten">
                                                                <h2 id ="greeting">Registration Successful! We are glad to greet you,  ${userDataOnServer.user}</h2>
                                                                </div>
                                                        </div>`;
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

}
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
    
    async function sendLoginData(data) {
        console.log(data);
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
    
        try {
            const response = await fetch('/login', options);
    
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