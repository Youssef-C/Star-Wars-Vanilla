const pbody = document.querySelector('pbody');

const nextButton = document.querySelector("#button-next")
const preButton = document.querySelector("#button-previous")

const modal = document.getElementById("myModal");

//let SWAPI_url = 'http://swapi.dev/api/people/?page=1';

async function getSWAPI(url = 'http://swapi.dev/api/people/?page=1') {
    const response = await fetch(url);   
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
            getSWAPI(data.next);
        }
    };
    

    preButton.onclick = function(){
        if (data.previous !== null) {
            getSWAPI(data.previous);
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

    //---Potential solve for the modal button and it's content---
    var counter = "";
    for (i = 0; i < data.results.length; i++) {
            counter += data.results[i].name + "<br>"
    };

    document.getElementById("demo").innerHTML = counter;
        
    document.querySelector('#modal-content').innerHTML = data.results.map(characters => 
            `<div style="display: none">
                <span class="close">&times;</span>
                <div class="charAge">Age: ${characters.birth_year}</div>
                <div class="charName">Name: ${characters.name}</div>
            </div>`).join('');

    //---MODAL---

    // Get the modal
    

    // Get the button that opens the modal
    var btn = document.getElementsByClassName("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    // When the user clicks on the button, open the modal
  /*
    btn.onclick = function() {
    modal.style.display = "block";
    }
*/
    const showPerson = (name) => {
        // scanna samtliga divvar i modalne
        // sätt inline style, display block på den diven som hör till name
        const modalChildren = document.querySelector('#modal-content').children
        for (div of modalChildren) {
            const nameContent = div.querySelector('.charName').innerText
            const foundName = nameContent.substr(6, nameContent.length)
            if (foundName === name) {
                div.style="display: block"
            }
        }
    }
/*
    const hidePerson = (name) => {
        // som ovan fast tvärtom
        const modal = document.querySelector('#modal-content').children
        for (div of modal) {
            const nameContent = div.querySelector('.charName').innerText
            const foundName = nameContent.substr(6, nameContent.length)
            if (foundName === name) {
                div.style="display: none"
            }
        }
    }
*/

const hideModalContents = () => {
    const modalChildren = document.querySelector('#modal-content').children
        for (div of modalChildren) {
            div.style="display: none"
        }
}
    $(".myBtn").click(function(event) {
        showPerson(event.target.closest('div').children[0].innerText)
        
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
   /*  $(".close").onclick = function() {
        console.log("YO")
    modal.style.display = "none";
    hideModalContents();
    } */

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || event.target.classList.contains('close')) {
            modal.style.display = "none";
            hideModalContents();
        }
    }
};




getSWAPI();