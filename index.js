const nextButton = document.querySelector("#button-next");
const preButton = document.querySelector("#button-previous");

const modal = document.getElementById("myModal");

async function getSWAPI(url = 'http://swapi.dev/api/people/?page=1') {
    const response = await fetch(url);   
    const data = await response.json();

    // These lines (10-21) takes the next and previous button, and when the user clicks them changes the API call to the "next" or "previous" value
    nextButton.onclick = function(){
        if (data.next !== null) { 
            getSWAPI(data.next);
        }
    };
    
    preButton.onclick = function(){
        if (data.previous !== null) {
            getSWAPI(data.previous);
        }
    };
    
    // These lines print the actual cards and their contents with the data from the API call, appends it into the div called "app" and replaces the placeholders
    document.querySelector('#flexContainer').innerHTML = data.results.map(characters => 
        `<div class="charCard">
            <h3 class="charTitle">${characters.name}</h3>
            <div class="charAge">Age: ${characters.birth_year}</div>
            <div class="">Eye Color: ${characters.eye_color}</div>
            <button class="modalBtn">Open Modal</button>
        </div>`
    ).join('');

    // Gets the modal and then maps the data from the API call onto the elements   
    document.querySelector('#modal-content').innerHTML = data.results.map(characters => 
            `<div style="display: none">
                <span class="close">&times;</span>
                <div class="charAge">Age: ${characters.birth_year}</div>
                <div class="charName">Name: ${characters.name}</div>
            </div>`).join('');

    
    
    //---MODAL---

    //These lines look through all the divs in the modal and, tries to find a match for the name element and then prints data based on the match
    const showPerson = (name) => {
        // scanna samtliga divvar i modalne
        // sätt inline style, display block på den diven som hör till name
        const modalChildren = document.querySelector('#modal-content').children
        for (div of modalChildren) {
            const nameContent = div.querySelector('.charName').innerText
            const foundName = nameContent.substr(6, nameContent.length)
            // Here it looks for a match and if one is found it changes the elements display property
            if (foundName === name) {
                div.style="display: block"
            }
        }
    };

    // These lines hide the modals children, used later on line 75   
    const hideModalContents = () => {
    const modalChildren = document.querySelector('#modal-content').children
        for (div of modalChildren) {
            div.style="display: none"
        }
    };
    
    $(".modalBtn").click(function(event) {
        showPerson(event.target.closest('div').children[0].innerText)
        
        modal.style.display = "block";
    });

    // When the user clicks anywhere outside of the modal, or on an element with the class of "close", close the modal
    window.onclick = function(event) {
        if (event.target == modal || event.target.classList.contains('close')) {
            modal.style.display = "none";
            hideModalContents();
        }
    }
};

getSWAPI();