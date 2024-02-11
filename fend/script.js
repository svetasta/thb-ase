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
            
            createUserPersonalAcountPage(localStorage.getItem('username'));
        }
        else{
            switchToLogin();
            console.log('at login');
        } ;
    
    
     } 
     if (path=== '/about') {
        console.log('at reg'+ window.location.pathname);
        switchToAbout();
     } 
};
function switchToAbout(){
    const accordion = document.querySelector('.accordion');
    accordion.innerHTML = '';

   
    const about = document.createElement('div');
     about.className = 'aboutItem';
     about.innerHTML = 'In  digital age, plant enthusiasts are constantly seeking new ways to connect with like-minded individuals and share their love for all things green.'
     accordion.appendChild(about);
    history.pushState({}, '', '/about');
}

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
function switchToLogout(){
    if (localStorage.getItem('username')){
        console.log("tak");
        logout();
        switchToHome();
    }

}

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
            document.getElementById('content').innerHTML = '';
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
      //  
        sendLoginData(logginUserData)
        .then (userDataOnServer=>{
            console.log ("server got it");
            // Update the content in HTML on successful login
            if(userDataOnServer.isLoggedIn==true)
                {   
                    handleLoginSuccess(userDataOnServer.username, userDataOnServer.userID);
                    createUserPersonalAcountPage(userDataOnServer.username);
                    

                 }
             else 
                {
                    document.getElementById('content').innerHTML = '';
                    
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
        const content = document.getElementById('content');
          document.getElementById('content').innerHTML = '';
          const LogginUserGreeting = document.createElement('div'); 
          LogginUserGreeting.id= 'LogginUserGreeting'
            LogginUserGreeting.innerHTML = `<div class= "greeting">
                        <div class="greeting-conten">
                            <div class="form-content">
                                 <div class="form-items">
                                        <h2 id ="greeting">You are looged in successfuly! We are glad to greet you,  ${username}</h2>
                                    
                                        <form id="uploadForm" enctype="multipart/form-data">
                                            <input type="file" id="imageInput" name="image" accept="image/*" onchange="previewImage()">
                                            <label for="textInput">Enter Text:</label>
                                            <input type="text" id="textInput" name="text" placeholder="Enter text here">
                                            <button type="button" onclick="uploadImage()">Upload Image</button>
                                        </form>
                                        <div id="result"></div>
                                        <div id="imagePreview"></div>
                                </div>
                            </div>                
                        </div>`;   
                        content.appendChild(LogginUserGreeting); 
                        const loggedUser = username;  
                        getUserPosts(loggedUser);       
        }
        
             else 
                {
                    document.getElementById('content').innerHTML = '';
                    document.getElementById('content').innerHTML = `<div class= "greeting">
                    <div class="greeting-conten">
                        <h2 id ="greeting">You are not registered user! You are welcome to register to enter our community!</h2>
                        </div>
                    </div>`;
                }
    history.pushState({}, '', '/my-greenhouse/');

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


    
    async function getUserPosts(loggedInUsername) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: loggedInUsername}), // Send the username in the request body
        };
    
        try {
            console.log('GET-IT'); 
            const response = await fetch('/userPosts', options);
    
            // Check if the response is successful
            if (!response.ok) {
                // Extract error information from the response
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch user posts: ${response.status} ${errorMessage}`);
            }
    
            // Parse the response body as JSON
            const data = await response.json();
            createList(data); // Process the retrieved data
            
        }catch (error) {
            console.error('Error in getUserPosts:', error.message);
        }
     
    }
    

//Hier send GET request to the backend and when the data from the backend delivered call the function to make for every piece of data a nice frame in html
function getPosts() {
        //  fetch logic for questions
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                createAccordionItems(data);
               
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
            const accordionTitle = document.createElement('div');
            accordionTitle.className = 'accordion-title';
            accordionTitle.innerHTML=item.username;
            

            const accordionButton = document.createElement('button');
            accordionButton.className = 'accordion-button';
            accordionButton.onclick = function() { clicbutton(this, item._id); }; 
            accordionButton.innerHTML ='like';

            const accordionContent = document.createElement('div');
            accordionContent.className = 'accordion-content';
            accordionContent.innerHTML = `<p>${item.text}</p>`;

            const accordionIcon = document.createElement('div');
            accordionIcon.className = 'accordion-icon';
            accordionIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-flower1" viewBox="0 0 16 16">
            <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
          </svg>`;

          const accordionInteger = document.createElement('div');
          accordionInteger.className = 'accordation-integer';
          accordionInteger.innerHTML = `${item.likes}`;
            
         if (item.image && item.image.data && item.image.contentType.startsWith('image')) {
       const base64Data = convertImage (item.image.data.data);
       
        const img = document.createElement('img');
        img.className = 'accordion-image';
        img.onload = function() {
            const resizedImg = resizeImage(img, 600, 600); // Resize to 600x600
            resizeImage.className = 'accordion-image';
            accordionItem.appendChild(resizedImg);
        };
        img.src = `data:${item.image.contentType};base64,${base64Data}`;
       
    }   accordionItem.appendChild(accordionTitle);
        accordionItem.appendChild(accordionContent);
        accordionItem.appendChild(accordionIcon);
        
        accordionItem.appendChild(accordionButton);
        accordionItem.appendChild(accordionInteger);
        
        accordion.appendChild(accordionItem);

    });
    }
    
// the function create html for the list of the posts created by the user
function createList(data) {
    const listContainer = document.createElement('div'); 
    listContainer.id = 'postList'; // Set the id to 'postList'
    
    const greetingContent = document.querySelector('.greeting-conten'); 
    
    greetingContent.appendChild(listContainer); 
    const listTitle = document.createElement('h2')
    listTitle.innerHTML ='Post you have created'

    const list = document.createElement('ul');
    list.className ='list-group';

    data.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className ="list-group-item active";
        listItem.id = post._id;
        const postText = post.text.split(' ').slice(0, 10).join(' '); // Extract first 10 words
     //   const link = document.createElement('a');
     //   link.href = '#'; // Replace '#' with the actual link destination
         listItem.textContent = postText;
      //  listItem.appendChild(link);
        list.appendChild(listItem);
        //Create buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary';
        editButton.addEventListener('click', () => {
            editPost(post._id); 
        });

        listItem.appendChild(editButton);
        //listItem.appendChild(deleteButton);
    });
    listContainer.appendChild(listTitle)
    listContainer.appendChild(list);
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

function convertImage(image){
     // Convert Buffer to Uint8Array
     //const uint8Array = new Uint8Array(item.image.data.data);

     const uint8Array = new Uint8Array(image);
     // Convert Uint8Array to array of numbers
     const dataArray = Array.from(uint8Array);
    
     // Convert array of numbers to base64 string
     //const base64Data = btoa(String.fromCharCode(...dataArray));
     const CHUNK_SIZE = 0x8000; // 32kbyte

    // const dataArray = new Uint16Array(Math.ceil(uint8Array.length / 2));
     for (let i = 0; i * CHUNK_SIZE < uint8Array.length; i++) {
         const chunk = uint8Array.subarray(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
         for (let j = 0; j < chunk.length; j++) {
             dataArray[i * CHUNK_SIZE + j] = chunk[j];
         }
     }
     
     let base64Data = '';
     for (let i = 0; i < dataArray.length; i++) {
         base64Data += String.fromCharCode(dataArray[i]);
     }
     base64Data = btoa(base64Data);
    
     return base64Data;

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



    async function editPost(postId) {
        history.pushState({ postId: postId }, '', `/myposts/${postId}`);
      
        try {
            const postData = await getUserPostById(postId);
            console.log("User post by ID: in function editPost", postData);
    
            // Create DOM elements and populate them with fetched data
            const accordion = document.createElement('div');
            accordion.className = 'accordion';
            document.getElementById('content').appendChild(accordion);
            const postDataArray = [];

        // Push the postData into the array
            postDataArray.push(postData);
            createAccordionItems(postDataArray);
        } catch (error) {
            console.error('Error in editPost:', error.message);
        }
        const accordionButton=document.getElementsByClassName('accordion-button');
        accordionButton.innerHTML='';
        accordionButton.innerHTML='close';
        const accordionItem =document.getElementsByClassName("accordion-item");
        // Add buttons for delete, edit, and close
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // Call deletePost function passing the postId
        //  deletePost(postId);
        });
        accordionItem.appendChild(deleteButton);








    }
    async function clicbutton(button, postId) {
        try {
            console.log( postId+ "GOT POST ID IN FUNCTION clickbutton")
        
            const postData = await getUserPostById(postId);
            const clickCount= postData.likes
            console.log(clickCount+ "LIKES recieved from BACKEND IN FUNCTION")
            // Increment the click count by 1
            const newClickCount = clickCount + 1;
          // button.nextElementSibling.textContent = newClickCount;
            const nextElement = button.nextElementSibling;
       if (nextElement) {
            console.log("EXIST")
            
            
            nextElement.textContent = '';
            nextElement.textContent=newClickCount;
        } else {
            console.error('Next sibling element not found');
        }
       

      
            await sendClickCountToBackend(postId,newClickCount);
    
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
 
        
 async function sendClickCountToBackend(postId,newClickCount){
    console.log( postId+ "GOT POST ID IN FUNCTION clickbutton")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: postId, likes: newClickCount })// Send the postId and number of likes in the request body
        };
        try {
            const response = await fetch('/userPostByID/click', options);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user post by ID');
            }
    
            const data = await response.json();
            //console.log("User post by ID:", data);
            
        } catch (error) {
            console.error('Error in getUserPostById:', error.message);
        }
    

    }
    
    async function getUserPostById(postId) {
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: postId }), // Send the postId in the request body
        };
    
        try {
            const response = await fetch('/userPostByID', options);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user post by ID');
            }
    
            const data = await response.json();
            //console.log("User post by ID:", data);
            return data;
        } catch (error) {
            console.error('Error in getUserPostById:', error.message);
        }
    }
    
    
    async function deletePost(postId) {
        try {
            const response = await fetch(`/posts/${postId}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
    
            // If successful, remove the deleted post from the UI
            const deletedPostElement = document.getElementById(postId);
            deletedPostElement.remove();
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    }

    
function handleLoginSuccess(username, userID) {
        // Save the username to localStorage
        localStorage.setItem('loggedIn', true);
        console.log ("in Storage");
        localStorage.setItem('username', username); 
        localStorage.setItem('userID', userID);
    }   
    
function logout() {
        // Clear localStorage and redirect to the home page
        localStorage.clear();
        switchToHome();
     }
     function findSiblingWithClassName(element, className) {
        let nextSibling = element.nextElementSibling;
        while (nextSibling) {
            if (nextSibling.classList.contains(className)) {
                return nextSibling;
            }
            nextSibling = nextSibling.nextElementSibling;
        }
        return null; // Return null if no sibling with the specified class is found
    }
    
   
    