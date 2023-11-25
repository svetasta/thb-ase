function toggleAccordion(button) {
    const content = button.nextElementSibling;
   // content.style.display = content.style.display === 'block' ? 'none' : >
    button.children[1].classList.toggle('rotate');
}

fetch('/')
    .then(response => response.json())
    .then(data => {
        
        createAccordionItems(data);
    })
    .catch(error => console.error('Error:', error));

// 创建手风琴项的函数
function toggleAccordion(button) {
    const content = button.nextElementSibling;
  //  content.style.display = content.style.display === 'block' ? 'none' : >
    button.children[1].classList.toggle('rotate');
}

// 使用 fetch 发送请求到后端
fetch('/')
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
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        // 创建手风琴按钮
        const accordionButton = document.createElement('button');
        accordionButton.className = 'accordion-button';
        accordionButton.onclick = function() { toggleAccordion(this); };
        //accordionButton.innerHTML = <div class="accordion-title">${item.>

        // 创建手风琴内容
        const accordionContent = document.createElement('div');
        accordionContent.className = 'accordion-content';
        accordionContent.innerHTML = `<p>${item.answer}</p>`;

        // 将按钮和内容添加到手风琴项目中
        accordionItem.appendChild(accordionButton);
        accordionItem.appendChild(accordionContent);

        // 将手风琴项目添加到手风琴容器中
        accordion.appendChild(accordionItem);
    });}