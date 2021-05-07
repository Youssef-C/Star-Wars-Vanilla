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

   /* const modalButton = document.getElementById("modal-open")

    modalButton.onclick = function(){
        console.log("hello")
    }; */

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
        </div>`
    ).join('')

};

getSWAPI();