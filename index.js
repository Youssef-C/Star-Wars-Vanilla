const pbody = document.querySelector('pbody');

const nextButton = document.getElementById("button-next")
const preButton = document.getElementById("button-previous")


let SWAPI_url = 'http://swapi.dev/api/people/?page=1';

async function getSWAPI() {
    const response = await fetch(SWAPI_url);   
    const data = await response.json();

    /*
    var myObj = (data.results);  

    let names = myObj.map(a => " " + a.name);
    let ages = myObj.map(a => " " + a.birth_year);
    let eyes = myObj.map(a => " " + a.eye_color);

    
    document.getElementById("names").innerHTML = names;
    document.getElementById("birth-years").innerHTML = ages;
    document.getElementById("eye-colors").innerHTML =  eyes; */

     

    nextButton.onclick = function(){
        if (data.next !== null) {
            SWAPI_url = data.next; 
            getSWAPI();
        }
    };
    

    preButton.onclick = function(){
        if (data.previous !== null) {
            SWAPI_url = data.previous;
            getSWAPI();
        }
    }
    
    document.querySelector('#app').innerHTML = data.results.map(characters => 
        `<div>
          <h3 class="charTitle">${characters.name}</h3>
          <div class="charAge">Age: ${characters.birth_year}</div>
          <div class="">Eye Color: ${characters.eye_color}</div>
          <button class="myBtn">Open Modal</button>
        </div>`
    ).join('');

    document.querySelector('#modal-content').innerHTML = data.results.map(characters =>
            `<div>
                <div class="charAge">Age: ${characters.birth_year}</div>
            </div>`
        )

    //---MODAL---

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementsByClassName("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    $(".myBtn").click(function() {
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};




getSWAPI();