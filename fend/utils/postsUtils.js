// postUtils.js



/*function getQuestions() {
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
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    button.children[1].classList.toggle('rotate');
}
export{getQuestions, createAccordionItems, toggleAccordion};*/