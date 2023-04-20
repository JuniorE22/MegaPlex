let allAnimeData = [];
let GET_URL = "https://api.jikan.moe/v4/anime";
let animeContainer = document.querySelector(".animeContainer")
let containerTextCenter = document.querySelector("#containerText")
let animeRow = document.querySelector("#rowContainer")
const inputSearch = document.querySelector("#inputSearch")
const btnSearch = document.querySelector("#btnSearch")
const selectType = document.querySelector("#selectType")
const pagination = document.querySelector("#pagination")
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")
let pages;
let currentPage = 1;


getAllAnimeData = async (params = {}) => {
    const url = new URL(GET_URL);
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
    );

    const response = await fetch(url.href)
    const { data } = await response.json();
    console.log(data);
    allAnimeData = data;

}
const createElements = () => {
    animeRow.innerHTML = "";
    allAnimeData.forEach(animeData => {
        let colDiv = document.createElement("div");
        let columnDiv = document.createElement("div");
        let imgAnime = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleAnime = document.createElement("h5");
        let typeAnime = document.createElement("p");
        let watchAnime = document.createElement("a");

        colDiv.className = "col"
        columnDiv.className = "card";
        columnDiv.style = "width: 13rem";
        imgAnime.className = "card-img-top";
        imgAnime.src = animeData.images.webp.image_url;
        divDescription.className = "card-body";
        typeAnime.className = "card-text";
        watchAnime.className = "btn btn-primary";
        titleAnime.className = "card-title text-truncate";
        titleAnime.setAttribute('data-bs-toggle', "tooltip")
        titleAnime.setAttribute('data-bs-placement', "top")
        titleAnime.setAttribute('data-bs-title', `${animeData.title}`)
        titleAnime.textContent = animeData.title;
        typeAnime.textContent = animeData.type;
        watchAnime.textContent = "Watch Anime"

        animeRow.appendChild(colDiv);
        colDiv.appendChild(columnDiv);
        columnDiv.appendChild(imgAnime);
        columnDiv.appendChild(divDescription);
        divDescription.appendChild(titleAnime);
        divDescription.appendChild(typeAnime);
        divDescription.appendChild(watchAnime);

    })
}
const buildParams = () => {
    const params = {
        q: inputSearch.value,
        type: selectType.value,
        page: currentPage
    }
    return params;
}
const retrocederPagina = async () => {
    currentPage = currentPage - 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
}
const nextPagina = async () => {
    currentPage = currentPage + 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
}
const createPagination = () => {
    for (let index = 1; index <= 10; index++) {
        const liPagination = document.createElement("li");

        liPagination.className = "page-item";
        const aPage = document.createElement("a");
        aPage.className = "page-link";
        pages = aPage.textContent = `${index}`

        pagination.appendChild(liPagination);
        liPagination.appendChild(aPage);
        pagination.appendChild(next);

    }
}
previous.addEventListener("click", async () => {
    await retrocederPagina();
})
next.addEventListener("click", async () => {
    await nextPagina();
})

btnSearch.addEventListener("click", async () => {
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
})

selectType.addEventListener("change", async () => {
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
})
window.onload = async () => {
    createPagination();
    await getAllAnimeData();
    createElements();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}