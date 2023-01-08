const form = document.getElementById('searchEngine');
const search = document.getElementById('search');
const result = document.getElementById('resultSection');

const beforeValue = "https://api.jikan.moe/v4/characters?page=1&limit=10&q=";
const afterValue = "&order_by=favorites&sort=desc";

// listen event in form input

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim();
    if (!searchValue) {
        alert("there is nothing to search!!")
    } else {
        searchAnime(searchValue);
    }
});

// search Anime

async function searchAnime(searchValue) {
    const searchResult = await fetch(`${beforeValue} ${searchValue} ${afterValue}`);

    const data = await searchResult.json();

    showData(data);
}

// display final result

function showData(data) {

    let newDataArray = "";
    data.data.forEach(element => {
        console.log(element);

        const addHTML = `<img src="${element.images.jpg.image_url}">`

        const newData = `
        <div class="mainSection">
            <div class="mainDetail">
                <div class="mainImage" id="mainImage">
                    <img src="${element.images.jpg.image_url}" alt="image" id="image" />
                </div>
                <div class="mainName" id="mainName">
                    <h3 id="name">${element.name}</h3>
                    <h4 id="nickName">${element.nicknames}</h4>
                </div>
                <div class="mainFav">
                    <h3>&hearts;</h3>
                    <h3><span>${element.favorites}</span></h3>
                </div>
            </div>
            <div class="mainMore" id="mainMore">
                <a href="${element.url}" target="_blank">More</a>
            </div>
        </div>
        `

        newDataArray += newData;
        // console.log(element);
    });
    result.innerHTML = newDataArray;
}