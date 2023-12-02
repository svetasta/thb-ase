
function switchToHome(){
    console.log('Switching to Home');
    document.getElementById('content').innerHTML = getQuestions();
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

// Check the url in browser switch to registration if in browser the path to it
if (window.location.pathname === '/registration') {
    console.log('url'+ window.location.pathname);
    switchToRegistration();
}

// Handle browser back/forward buttons
window.onpopstate = function(event) {
    if (window.location.pathname === '/registration') {
        switchToUsers();
    } else {
        switchToHome();
    }
};

function toggleAccordion(button) {
    const content = button.nextElementSibling;
   // content.style.display = content.style.display === 'block' ? 'none' : >
    button.children[1].classList.toggle('rotate');
}
function getQuestions(){
fetch('/answered_questions')
    .then(response => response.json())
    .then(data => {
        // 使用返回的数据来创建手风琴项
        createAccordionItems(data);
    })
    .catch(error => console.error('Error:', error));

// 创建手风琴项的函数
function createAccordionItems(data) {
    const accordion = document.querySelector('.accordion');
    accordion.innerHTML = ''; // 清空现有的内容

    data.forEach (item => {
        // 创建手风琴项目
        console.log(item.text);
         const accordionItem = document.createElement('div');
         accordionItem.className = 'accordion-item';
        // 创建手风琴按钮
        const accordionButton = document.createElement('button');
         accordionButton.className = 'accordion-button';
         accordionButton.onclick = function() { toggleAccordion(this); };
         accordionButton.innerHTML = item.text

        // 创建手风琴内容
        const accordionContent = document.createElement('div');
        accordionContent.className = 'accordion-content';
        accordionContent.innerHTML = `<p>${item.answer}</p>`;

        // 将按钮和内容添加到手风琴项目中
        accordionItem.appendChild(accordionButton);
        accordionItem.appendChild(accordionContent);

        // 将手风琴项目添加到手风琴容器中
        accordion.appendChild(accordionItem);
    });}}