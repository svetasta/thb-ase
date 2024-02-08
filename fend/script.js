//script.js
function getPathFromURL() {
    return window.location.pathname;
  }
  





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
     if (path=== '/home') {
        console.log('at home'+ window.location.pathname);
         switchToHome();
     } 
    if (path=== '/registration') {
        console.log('at reg'+ window.location.pathname);
         switchToRegistration();
     } 
    if (path=== '/my-greenhouse') { 
        if (localStorage.getItem('username')){
            console.log("tak");
            createUserPersonalAcountPage(localStorage.getItem('username'));
        }
        else{
            switchToLogin();
            console.log('at login');
        } ;
    
    
     } 
};

// create html of the home page change url 
function switchToHome(){
    console.log('Switching to Home');
    document.getElementById('content').innerHTML = '';
    const accordion=document.createElement('div')
    accordion.className = 'accordion';
    document.getElementById('content').appendChild(accordion);
    getPosts();
    history.pushState({}, '', '/home');

};

//create register form in as html
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
                            <label id = "emailLabel" for="email">Email adress:</label>
                            <div class="col-md-12">
                            <input id = "email" class="form-control" type="text"  name="email" placeholder=" your email"required>
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

//add register form in html change url 
function switchToRegistration() {
    createForm();
    const emailField = document.getElementById('email');
    emailField.disabled = false;
    history.pushState({}, '', '/registration');
};

//add login form in html , change url 
function switchToLogin() {
    if (localStorage.getItem('username')){
        console.log("tak");
        createUserPersonalAcountPage(localStorage.getItem('username'));
    }
    else{
        createForm();
            // Get the button element by its id
        const submitButton = document.getElementById('submit');
        // Change the text content
        submitButton.textContent = 'Login';
        const labelToForm= document.getElementById('labelToForm');
        labelToForm.textContent = "login here below" ;
        const titelToForm= document.getElementById('titelToForm');
        const emailLabel = document.getElementById('emailLabel');
        const emailField = document.getElementById('email');
        titelToForm.textContent = "Are you a registered member? " ;
        emailLabel.style.display = 'none';
        emailField.style.display = 'none';
        emailField.disabled = true;
            history.pushState({}, '', '/my-greenhouse');
    }
};

// get the data from input field of register form and call the function to send them as json  
function submitForm(event) 
{
    event.preventDefault();
    const pathForm = getPathFromURL();
    // Get the new username and password from HTML
    const newUsername = document.getElementById('name').value;
    const newUserpassword = document.getElementById('password').value;
    const newUseremail = document.getElementById('email').value;
    console.log(newUsername, newUserpassword,newUseremail+ "from form");
    const logginUserData = {newUsername, newUserpassword};
    const newUserdata = { newUsername, newUserpassword, newUseremail};

    // Send a POST request to the server 
    if (pathForm=== '/registration')
        {
            sendRegistrationData(newUserdata)
            .then(userDataOnServer => {
            // The response from server here
            console.log ("server got it");

            // Log additional information
            console.log("html");

            // Update the content in HTML on successful registration
            document.getElementById('content').innerHTML = `<div class= "greeting">
                                                                <div class="greeting-conten">
                                                                    <h2 id ="greeting">Registration Successful! We are glad to greet you,  ${userDataOnServer.username}</h2>
                                                                    </div>
                                                            </div>`;
            })
            .catch((error) => {
            console.error('Error:', error.message);
            });
        }
   
    if (pathForm=== '/my-greenhouse') {
       
        sendLoginData(logginUserData)
        .then (userDataOnServer=>{
            console.log ("server got it");
            // Update the content in HTML on successful login
            if(userDataOnServer.isLoggedIn==true)
                {   
                    handleLoginSuccess(userDataOnServer.username);
                    createUserPersonalAcountPage(userDataOnServer.username);

                  /*  document.getElementById('content').innerHTML = `<div class= "greeting">
                    <div class="greeting-conten">
                        <h2 id ="greeting">You are looged in successfuly! We are glad to greet you,  ${userDataOnServer.username}</h2>
                       
                        <form id="uploadForm" enctype="multipart/form-data">
                            <input type="file" id="imageInput" name="image" accept="image/*" onchange="previewImage()">
                            <label for="textInput">Enter Text:</label>
                            <input type="text" id="textInput" name="text" placeholder="Enter text here">
                            <button type="button" onclick="uploadImage()">Upload Image</button>
                        </form>
                        <div id="result"></div>
                        <div id="imagePreview"></div>
                    </div>`;*/
                 }
             else 
                {
                    document.getElementById('content').innerHTML = `<div class= "greeting">
                    <div class="greeting-conten">
                        <h2 id ="greeting">You are not registered user! You are welcome to register to enter our community!</h2>
                        </div>
                    </div>`;
                }

        })
        
    
    }
}


function createUserPersonalAcountPage(username){
    if (username== localStorage.getItem('username')){
        document.getElementById('content').innerHTML = `<div class= "greeting">
                        <div class="greeting-conten">
                            <h2 id ="greeting">You are looged in successfuly! We are glad to greet you,  ${username}</h2>
                        
                            <form id="uploadForm" enctype="multipart/form-data">
                                <input type="file" id="imageInput" name="image" accept="image/*" onchange="previewImage()">
                                <label for="textInput">Enter Text:</label>
                                <input type="text" id="textInput" name="text" placeholder="Enter text here">
                                <button type="button" onclick="uploadImage()">Upload Image</button>
                            </form>
                            <div id="result"></div>
                            <div id="imagePreview"></div>
                        </div>`;
        }
             else 
                {
                    document.getElementById('content').innerHTML = `<div class= "greeting">
                    <div class="greeting-conten">
                        <h2 id ="greeting">You are not registered user! You are welcome to register to enter our community!</h2>
                        </div>
                    </div>`;
                }
    history.pushState({}, '', '/my-greenhouse');

}

//CURL method POST to backend /register
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
                throw new Error(`MyServer responded with status: ${response.status}`);
            }
    
            const userJson = await response.json();
            return userJson;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
 
  //CURL method POST to backend /login  
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
    
    
            const userJson = await response.json();
            return userJson;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

function handleLoginSuccess(username) {
        // Save the username to localStorage
        localStorage.setItem('loggedIn', true);
        console.log ("in Storage");
        localStorage.setItem('username', username);

       
    
    }   



//Hier send GET request to the backend and when the data from the backend delivered call the function to make for every piece of data a nice frame in html
function getPosts() {
    console.log ("frontend data get")
        //  fetch logic for questions
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                createAccordionItems(data);
                console.log ("frontend data")
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }



// make as many html items as got posts (currently questions) from backend
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
            accordionContent.innerHTML = `<p>${item.text}</p>`;
            
         if (item.image && item.image.data && item.image.contentType.startsWith('image')) {
        /*console.log('IMAGE EXISTS')
        console.log(item.image.data); // Check if this prints the image data
        console.log(item.image.data.length); // Check the length of the image data
        console.log(item.image.data.data.length);*/

        // Convert Buffer to Uint8Array
        const uint8Array = new Uint8Array(item.image.data.data);
        
        // Convert Uint8Array to array of numbers
        const dataArray = Array.from(uint8Array);
       
        // Convert array of numbers to base64 string
        const base64Data = btoa(String.fromCharCode(...dataArray));
       

        const img = document.createElement('img');
        img.className = 'accordion-image';
        img.onload = function() {
            const resizedImg = resizeImage(img, 1200, 1200); // Resize to 600x600
            resizeImage.className = 'accordion-image';
            accordionItem.appendChild(resizedImg);
        };
        img.src = `data:${item.image.contentType};base64,${base64Data}`;
       
    }

        
    
        accordionItem.appendChild(accordionButton);
        accordionItem.appendChild(accordionContent);
        accordion.appendChild(accordionItem);

    });
    }

   
   
    
    // Function to resize the image
    function resizeImage(img, targetWidth, targetHeight) {
        var canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
        var resizedImg = new Image();
        resizedImg.src = canvas.toDataURL('image/jpeg'); // Change 'image/jpeg' to the desired format
        return resizedImg;
    }
    
    


    


//broken function --- does not work    
    function toggleAccordion(button) {
        const content = button.nextElementSibling;
        // content.style.display = content.style.display === 'block' ? 'none' : 'block';
        button.children[1].classList.toggle('rotate');
    }

// does not work yet  
async function uploadImage() {
    
        const form = document.getElementById('uploadForm');
        const input = document.getElementById('imageInput');
        const resultDiv = document.getElementById('result');
        
        const formData = new FormData(form);
        
        try {

            //add user name to the data from the upload form to send image+ text +user name 
            const username = localStorage.getItem('username');
            formData.append('username', username);
            console.log([...formData.entries()]);
            const response = await fetch('/uploadpics', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                //const result = await response.json();
                resultDiv.innerHTML = `<p>Image uploaded successfully. </p>`;
            } else {
                const error = await response.text();
                resultDiv.innerHTML = `<p>Error: ${error}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p>An unexpected error occurred.</p>`;
        }
    }



//shows mini picture of the image ; is called by submitForm()
function previewImage() {
        const input = document.getElementById('imageInput');
        const previewDiv = document.getElementById('imagePreview');
    
        if (input.files && input.files[0]) {
            const reader = new FileReader();
    
            reader.onload = function (e) {
                previewDiv.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 300px; max-height: 300px;">`;
            };
    
            reader.readAsDataURL(input.files[0]);
        } else {
            previewDiv.innerHTML = '';
        }
    }
    
function logout() {
        // Clear localStorage and redirect to the home page
        localStorage.clear();
        switchToHome();
     }