let currentPage = 1;

let prevBtn = document.querySelector(".prevBtn")
let nextBtn = document.querySelector(".nextBtn")
let currBtn = document.querySelector(".currBtn")

prevBtn.addEventListener("click", handlePrev)
nextBtn.addEventListener("click", handleNext)
// currBtn.addEventListener("click", handleCurr)
// console.log("currentbtn",currBtn.innerHTML);


function handlePrev() {
    currentPage = currentPage - 1
    // console.log("curretnpage inside handlePrev", currentPage);
    getData(currentPage)
    currBtn.innerText = `${currentPage}`

}

function handleNext() {
    // console.log("curretnpage inside handleNext", currentPage);
    currentPage = currentPage + 1
    getData(currentPage)
    currBtn.innerText = `${currentPage}`

}

function getData(currentPage) {
    let url = `https://www.balldontlie.io/api/v1/players?per_page=10&page=${currentPage}`
    console.log("curretnpage inside getData", currentPage);
    fetch(url).then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            displayCards(data.data)
        })
        .catch((err) => {
            console.log(err)
        })

}

getData()

function displayCards(data) {
    // let active = true;
    document.querySelector(".container").innerHTML = ""

    data.forEach(el => {

        let div = document.createElement("div")
        div.setAttribute("class", "cardDiv")

        let playerImg = document.createElement("img")
        playerImg.setAttribute("src", "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ifb4umLyrsEk/v0/-1x-1.jpg")
        playerImg.setAttribute("class", "pimages")

        let name = document.createElement("p")
        name.innerText = `Name : ${el.first_name}${" "}${el.last_name}`

        let position = document.createElement("p")
        position.innerText = `Position : ${el.position}`

        let btn = document.createElement("button")
        btn.innerText = `Team Details`
        btn.setAttribute("class", "teamDetailsBtn")
        btn.addEventListener("click", () => {

            let teamName = document.createElement("p")
            teamName.innerText = `Team Name : ${el.team.full_name}`

            let abbreviation = document.createElement("p")
            abbreviation.innerText = `Abbreviation : ${el.team.abbreviation}`

            let conference = document.createElement("p")
            conference.innerText = `Conference : ${el.team.conference}`

            let division = document.createElement("p")
            division.innerText = `Division : ${el.team.division}`

            let city = document.createElement("p")
            city.innerText = `City: ${el.team.city}`

            div.append(teamName, abbreviation, conference, division, city)

        })


        div.append(playerImg, name, position, btn)
        document.querySelector(".container").append(div)
    });
}

let searchBtn = document.querySelector(".searchBtn")
searchBtn.addEventListener("click", searchFunction)

function searchFunction() {
    let query = document.querySelector(".search").value
    console.log(query)
    fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`).then((res) => res.json())
        .then((data) => {
            console.log("searched Data", data);
            displayCards(data.data)
        })
        .catch((err) => {
            console.log(err);
        })
}
