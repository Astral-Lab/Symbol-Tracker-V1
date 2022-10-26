initApp = () => {
    
    const HOME_BUTTON = document.querySelector('.home-button');

    HOME_BUTTON.addEventListener('click', () => {

        localStorage.clear(); // clear out localStorage

        window.open('../index.html', '_self');
    });

    const BACK_BUTTON = document.querySelector('.back-button');

    BACK_BUTTON.addEventListener('click', () => {

        window.open(localStorage.getItem('endLink'), '_self')
    })
}

document.addEventListener('DOMContentLoaded', initApp);