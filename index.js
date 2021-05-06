const SWAPI_page01 = 'http://swapi.dev/api/people/?page=1';
const SWAPI_page02 = 'http://swapi.dev/api/people/?page=2';
const SWAPI_page03 = 'http://swapi.dev/api/people/?page=3';
const SWAPI_page04 = 'http://swapi.dev/api/people/?page=4';
const SWAPI_page05 = 'http://swapi.dev/api/people/?page=5';
const SWAPI_page06 = 'http://swapi.dev/api/people/?page=6';
const SWAPI_page07 = 'http://swapi.dev/api/people/?page=7';
const SWAPI_page08 = 'http://swapi.dev/api/people/?page=8';
const SWAPI_page09 = 'http://swapi.dev/api/people/?page=9';

const pbody = document.querySelector('pbody');

const nextButton = document.getElementById("button-next")
const preButton = document.getElementById("button-previous")


let SWAPI_url = '';  
let page = 1;    

nextButton.onclick = function(){
    page = page+1; 
    pageCheck();
};


preButton.onclick = function(){
    if (page >= 2) {
        page = page-1; 
        pageCheck();
    }
};





//PSUEDO CODE
//if I click number => 
// set PAGE to number 

//Checks what page is equal too to then fetch depending on that value
function pageCheck() {
    if (page == 1 || 0) {
        SWAPI_url = SWAPI_page01
    } else if (page == 2) {
        SWAPI_url = SWAPI_page02
    } else if (page == 3) {
        SWAPI_url = SWAPI_page03
    } else if (page == 4) {
        SWAPI_url = SWAPI_page04
    } else if (page == 5) {
        SWAPI_url = SWAPI_page05
    } else if (page == 6) {
        SWAPI_url = SWAPI_page06
    } else if (page == 7) {
        SWAPI_url = SWAPI_page07
    } else if (page == 8) {
        SWAPI_url = SWAPI_page08
    } else if (page == 9) {
        SWAPI_url = SWAPI_page09
    }

    getSWAPI();
    
};


pageCheck();

//SIMPLY GETS THE DATA FROM THE API BASED ON THE PAGE NUMBER
async function getSWAPI() {
    const response = await fetch(SWAPI_url);   
    const data = await response.json();
    
    const characterName = (data.results[0].name);
    console.log(data);
    document.getElementById("demo").innerHTML = characterName;

};
