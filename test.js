const charactersList = document.querySelector('#flexContainer');
const searchBar = document.getElementById('searchBar');
const nextButton = document.querySelector("#button-next");
const preButton = document.querySelector("#button-previous");
const modal = document.getElementById("myModal");
let characters = [];

    //---SEARCH FUNCTIONALITY--- 
searchBar.addEventListener('keyup', (e) => {
    //Takes the input value and makes it lowercase and applies it to a new variable
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = characters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async (url = 'http://swapi.dev/api/people/?page=1') => {
    try {
        const res = await fetch(url);
        data = await res.json();
        characters = data.results;
        displayCharacters(characters);
    } catch (err) {
        console.error(err);
    }
    console.log(data.results);

    // These lines takes the next and previous button, and when the user clicks them changes the API call to the "next" or "previous" value/url
    nextButton.onclick = function(){
        if (data.next !== null) { 
            loadCharacters(data.next);
            searchBar.value="";
        }
    };
    
    preButton.onclick = function(){
        if (data.previous !== null) {
            loadCharacters(data.previous);
            searchBar.value="";
        }
    };

    //---MODAL---

    // Gets the modal and then maps the data from the API call onto the elements  
    document.querySelector('#modal-content').innerHTML = characters.map(characters => 
        `<div style="display: none">
            <span class="close">&times;</span>
            <div class="infoContainer">
            <div id="charName" class="charInfo"><strong>Name:</strong> ${characters.name}</div>
            <div class="charInfo"><strong>Age:</strong> ${characters.birth_year}</div>
            <div class="charInfo"><strong>Gender:</strong> ${characters.gender}</div>
            <div class="charInfo"><strong>Height:</strong> ${characters.height}" cm"</div>
            <div class="charInfo"><strong>Hair Color:</strong> ${characters.hair_color}</div>
            <div class="charInfo"><strong>Eye Color:</strong> ${characters.eye_color}</div>
            </div>
        </div>`).join('');
        
    //These lines look through all the divs in the modal and, tries to find a match for the name element and then prints data based on the match
    const showPerson = (name) => {
        const modalChildren = document.querySelector('#modal-content').children
        for (div of modalChildren) {
            const nameContent = div.querySelector('#charName').innerText
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



const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <div class="charCard">
                <h3 class="charTitle">${character.name}</h3>
                <button class="modalBtn">More info</button>
            </div>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();