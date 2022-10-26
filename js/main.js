/**
 * 1. User selects three symbols.
 * 
 * 2. Program logs these three symbols.
 * 
 * 3. Program generates links to the respective symbol guide page.
 * 
 * 4. Links are shown in order of occurence.
 */

const initApp = () => {

    const SYMBOL_LIMIT = 3;     // Used to limit the number of buttons which can be active to three

    const clickCount = {        // Stores the current state of the nine buttons RENAME THIS TO SOMETHING LIKE CLICKFLAG OR BUTTON FLAG
        'rune1': false,         // true = active, false = inactive
        'rune2': false,
        'rune3': false,
        'rune4': false,
        'rune5': false,
        'rune6': false,
        'rune7': false,
        'rune8': false,
        'rune9': false,
    };

    let selectedSymbols = {};   // probably can get rid of this object

    const RUNES = document.querySelectorAll('.grid-item');             // Array which stores the nine runes (buttons)

    RUNES.forEach(rune => {                                         // Ensure rune (button) functions correctly when clicked

        rune.addEventListener('click', () => {

            if(clickCount[`${rune.id}`]) {                          // Selected symbol has a border appear around it

                rune.style.backgroundColor = "black";               // probably a nicer way of doing this.

                clickCount[`${rune.id}`] = false;

                delete selectedSymbols[`${rune.id}`];

            } else if(Object.keys(selectedSymbols).length < 3) {    // if three symbols have not yet been selected continue as normal
            
                rune.style.backgroundColor = "hsl(115, 98%, 55%)";

                clickCount[`${rune.id}`] = true;

                selectedSymbols[`${rune.id}`] = rune;
            } 

            if(Object.keys(selectedSymbols).length === SYMBOL_LIMIT) {
                NEXT_BUTTON.style.backgroundColor = "#08654e";
                NEXT_BUTTON.style.color = "white";
            } else {
                NEXT_BUTTON.style.color = "hsla(0, 0%, 100%, 0.521)";
                NEXT_BUTTON.style.backgroundColor = "hsla(165, 85%, 21%, 0.507)";
            }
        });
       
    });

    const NEXT_BUTTON = document.querySelector('.next-button');

    NEXT_BUTTON.addEventListener('click', () => {

        if(Object.keys(selectedSymbols).length === SYMBOL_LIMIT) {  // ensure three symbols have been selected

            const links = [];       // generate the three links, append them to an array ascending order
            const linkedNodeList = [];

            for(const id in clickCount) {

                if(clickCount[`${id}`]) links.push(`${id}.html`); // is button active?
            }

            for(let currenNode = 0; currenNode < 3; currenNode++) {
                if(currenNode === 0) {    // will only be true when currentNode is zero 
                    linkedNodeList.push( { nextNode: links[1], previousNode: null } );
                } else if(currenNode === 2) {
                    linkedNodeList.push( { nextNode: null, previousNode: links[currenNode - 1] } );
                } else {
                    linkedNodeList.push( { nextNode: links[currenNode + 1], previousNode: links[currenNode - 1] } );
                }
            }

            localStorage.setItem('startNode', '0');

            localStorage.setItem('endLink', links[2]);

            localStorage.setItem('currentNode', '0');

            localStorage.setItem('links', JSON.stringify(linkedNodeList));
            
            window.open(`html/${links[0]}`, "_self");  // open first of three windows

        } 
    });
}

document.addEventListener('DOMContentLoaded', initApp);