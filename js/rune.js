const initApp = () => {

    const NEXT_BUTTON = document.querySelector('.next-button');

    NEXT_BUTTON.addEventListener('click', () => {

        if(JSON.parse(localStorage.getItem('links'))[localStorage.getItem('currentNode')].nextNode === null) {

            window.open('accepted.html', '_self');

        } else {

            window.open(JSON.parse(localStorage.getItem('links'))[localStorage.getItem('currentNode')].nextNode, "_self")

            localStorage.setItem('currentNode', Number(localStorage.getItem('currentNode')) + 1) // Point currentNode to nextNode

        }
       
    });

    if(localStorage.getItem('currentNode') !== localStorage.getItem('startNode')) { // Are we at the startNode? A back button should NOT be inserted then

        const BACK_BUTTON = document.createElement('div');

        BACK_BUTTON.setAttribute('class', 'back-button')

        BACK_BUTTON.appendChild(document.createTextNode("Back"));

        document.querySelector('.navigation').insertBefore(BACK_BUTTON, NEXT_BUTTON);

        BACK_BUTTON.addEventListener('click', () => {

            window.open(JSON.parse(localStorage.getItem('links'))[localStorage.getItem('currentNode')].previousNode, "_self");  // open next window in sequence

            localStorage.setItem('currentNode', Number(localStorage.getItem('currentNode')) - 1) // Point currentNode to nextNode
            
        });
    }

}

document.addEventListener('DOMContentLoaded', initApp);