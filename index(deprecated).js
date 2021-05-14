const nextButton = document.querySelector("#button-next");
const preButton = document.querySelector("#button-previous");
const searchBar = document.querySelector("#searchBar");
const charactersList = document.querySelector("#app")

let allChars = [];

const modal = document.getElementById("myModal");

async function getSWAPI(url = 'http://swapi.dev/api/people/?page=1') {
    const response = await fetch(url);   
    const data = await response.json();
    const characters = data.results;

    // These lines (14-25) takes the next and previous button, and when the user clicks them changes the API call to the "next" or "previous" value/url
    nextButton.onclick = function(){
        if (data.next !== null) { 
            getSWAPI(data.next);
        }
    };
    
    preButton.onclick = function(){
        if (data.previous !== null) {
            getSWAPI(data.previous);
            searchBar.value="";
        }
    };
    
    // ---SEARCHBAR---
    searchBar.addEventListener('keyup', (e) =>{
        searchString = e.target.value;
        const filteredChars = data.results.filter(characters => {
            return (
                characters.name.toLowerCase().includes(searchString) 
            );
        });
        displayCharacters(filteredChars);
        console.log(filteredChars);
        });

      
        charactersList.innerHTML = characters.map(character => 
            `<div class="charCard">
                <h3 class="charTitle">${character.name}</h3>
                <div class="charAge">Age: ${character.birth_year}</div>
                <div class="">Eye Color: ${character.eye_color}</div>
                <button class="modalBtn">Open Modal</button>
            </div>`
        ).join('');
        

        

    //---MODAL---

    // Gets the modal and then maps the data from the API call onto the elements  
    document.querySelector('#modal-content').innerHTML = characters.map(characters => 
        `<div style="display: none">
            <span class="close">&times;</span>
            <div class="charAge">Age: ${characters.birth_year}</div>
            <div class="charName">Name: ${characters.name}</div>
        </div>`).join('');
        
    //These lines look through all the divs in the modal and, tries to find a match for the name element and then prints data based on the match
    const showPerson = (name) => {
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
    console.log(characters)
};


// These lines print the actual cards and their contents with the data from the API call, appends it into the div called "app" and replaces the placeholders


getSWAPI();