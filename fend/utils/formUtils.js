// utils/formUtils.js

import { uploadImage, sendRegistrationData, sendLoginData } from './apiUtils.js';
import { getQuestions, createAccordionItems, toggleAccordion } from './postsUtils.js';
import {getPathFromURL, previewImageUpload} from '../bscript.js'
import { previewImage } from './imageUtils.js';


console.log("formUtils.js is loaded");


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
//add register form in html 
function switchToRegistration() {
    createForm();
    const emailField = document.getElementById('email');
    emailField.disabled = false;
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
  const emailLabel = document.getElementById('emailLabel');
  const emailField = document.getElementById('email');
  titelToForm.textContent = "Are you a registered member? " ;
  emailLabel.style.display = 'none';
  emailField.style.display = 'none';
  emailField.disabled = true;
    history.pushState({}, '', '/my-greenhouse');
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
                       
                                <button id ="submit" "type="submit" class="btn btn-primary" data-action="submitForm">Register</button>
                            </div>
                        </form> 
                 </div>
            </div>
         </div>
    </div>
    </div>  
    `;
}

// get the data from input field of register form and call the function to send them as json  
/*function submitForm(event) {
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
    if (pathForm=== '/registration'){
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
        console.log("login here")
        sendLoginData(logginUserData)
        .then (userDataOnServer=>{
            console.log ("server got it");
            // Update the content in HTML on successful login
  
            document.getElementById('content').innerHTML = `<div class= "greeting">
            <div class="greeting-conten">
            <h2 id ="greeting">You are looged in successfuly! We are glad to greet you,  ${userDataOnServer.username}</h2>
            </div>
            <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" id="imageInput" name="image" accept="image/*" onchange= "previewImage()">
            <label for="textInput">Enter Text:</label>
            <input type="text" id="textInput" name="text" placeholder="Enter text here">
            <button type="button" onclick="uploadImage()">Upload Image</button>
        </form>
        <div id="result"></div>
        <div id="imagePreview"></div>
    <div id="result"></div>
    </div>`;
        })
        
    
    }
}
export { switchToHome, switchToLogin,switchToRegistration, createForm, submitForm };*/