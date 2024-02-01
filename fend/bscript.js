// script.js

/*import { switchToHome, switchToRegistration, switchToLogin, submitForm, createForm } from './utils/formUtils.js';
import { uploadImage, sendRegistrationData, sendLoginData } from './utils/apiUtils.js';
import { getQuestions, createAccordionItems, toggleAccordion } from './utils/postsUtils.js';
import { previewImage } from './utils/imageUtils.js';



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
    console.log('checkPath function called');  
    
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
     if (path=== '/my-greenhouse') {    
         switchToLogin();
         console.log('at login');
     } 
};

//switching to home in menu
function switchHome() {  
    console.log("home switching from button");
    switchToHome();
    
};
function switchRegistration(){
    switchToRegistration()
};
function switchLogin(){ switchToLogin()
};

function previewImageUpload(){previewImage()} 

export{getPathFromURL, checkPath, switchHome,switchRegistration,switchLogin, previewImageUpload};*/