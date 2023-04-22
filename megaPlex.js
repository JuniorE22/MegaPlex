let allAnimeData = [];
let allPagination = [];
let GET_URL = "https://api.jikan.moe/v4/anime";
let animeContainer = document.querySelector(".animeContainer")
let containerTextCenter = document.querySelector("#containerText")
let animeRow = document.querySelector("#rowContainer")
const inputSearch = document.querySelector("#inputSearch")
const btnSearch = document.querySelector("#btnSearch")
const selectType = document.querySelector("#selectType")
const selectTypeSearch = document.querySelector("#selectTypeSearch")
const paginationContainer = document.querySelector("#pagination")

let pages;
let currentPage = 1;
let liPrevious = document.createElement("li");
let aPrevious = document.createElement("a");
let liNext = document.createElement("li");
let aNext = document.createElement("a");
let liPreviousSearch = document.createElement("li");
let aPreviousSearch = document.createElement("a");
let liNextSearch = document.createElement("li");
let aNextSearch = document.createElement("a");
let imgLogo = document.querySelector("#logo")

imgLogo.href = "http://127.0.0.1:5500/megaPlex.html#";

getAllAnimeData = async (params = {}) => {
    const url = new URL(GET_URL);
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
    );

    const response = await fetch(url.href)
    const { data, pagination } = await response.json();
    console.log(data, pagination);
    allAnimeData = data;
    allPagination = pagination;

}
const createElements = () => {
    paginationContainer.innerHTML = ""
    createPagination();

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
const createElementSearch = () => {
    paginationContainer.innerHTML = ""
    createPaginationSearch();

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
const buildParams = (number) => {
    const params = {
        q: inputSearch.value,
        type: selectType.value,
        page: currentPage
    }
    return params;
}
const retrocederPaginaSearch = async () => {
    currentPage = currentPage - 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElementSearch();
}
const retrocederPagina = async () => {
    currentPage = currentPage - 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
}
const nextPaginaSearch = async () => {
    currentPage = currentPage + 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElementSearch();
}
const nextPagina = async () => {
    debugger
    currentPage = parseInt(currentPage) + 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElements();
}
const createPagination = async () => {
debugger
    liPrevious.className = "page-item disabled";
    aPrevious.className = "page-link";
    aPrevious.setAttribute('tabindex', "-1")
    aPrevious.setAttribute('aria-disabled', "true")
    aPrevious.textContent = "Previous"

    
    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }
    
    paginationContainer.appendChild(liPrevious);
    liPrevious.appendChild(aPrevious);

    for (let index = 1; index <= 10; index++) {
        const liPagination = document.createElement("li");
        liPagination.className = "page-item";
        const aPage = document.createElement("a");
        aPage.href = "#";
        
        aPage.className = "page-link";
        liNext.className = "page-item ";
        aNext.className = "page-link";
        aNext.href = "#"
        aNext.textContent = "Next"

        aPage.textContent = `${index}`
        if (currentPage == 10) {
            liNext.className = "page-item disabled";
            aNext.className = "page-link";
            aNext.href = "#"
            aNext.textContent = "Next"
        }
        if (currentPage === index) {
            liPagination.className = "page-item active";
        }
        if (currentPage === aPage.textContent) {
            liPagination.className = "page-item active";
        }

        paginationContainer.appendChild(liPagination);
        liPagination.appendChild(aPage);
        paginationContainer.appendChild(liNext);
        liNext.appendChild(aNext);

        aPage.addEventListener("click", async () => {
            debugger
            aPage.href = "#";
            currentPage = aPage.textContent
            liPagination.className = "page-item active";
            
            const params = buildParams();
            await getAllAnimeData(params);
            createElements();


        })
    }

}

const createPaginationSearch = async () => {
    debugger
    liPreviousSearch.className = "page-item disabled";
    aPreviousSearch.className = "page-link";
    aPreviousSearch.setAttribute('tabindex', "-1")
    aPreviousSearch.setAttribute('aria-disabled', "true")
    aPreviousSearch.textContent = "Previous"

    if (currentPage > 1) {
        liPreviousSearch.className = "page-item";
        aPreviousSearch.className = "page-link";
        aPreviousSearch.setAttribute('aria-disabled', "false")
        aPreviousSearch.href = "#"
    }
    paginationContainer.appendChild(liPreviousSearch);
    liPreviousSearch.appendChild(aPreviousSearch);

    for (let index = 1; index <= allPagination.last_visible_page; index++) {
        const liPagination = document.createElement("li");
        liPagination.className = "page-item";
        const aPage = document.createElement("a");
        aPage.className = "page-link";
        liNextSearch.className = "page-item ";
        aNextSearch.className = "page-link";
        aNextSearch.href = "#"
        aNextSearch.textContent = "Next"

        pages = aPage.textContent = `${index}`
        if (currentPage == allPagination.last_visible_page) {
            liNextSearch.className = "page-item disabled";
            aNextSearch.className = "page-link";
            aNextSearch.href = "#"
            aNextSearch.textContent = "Next"
        }
        if (currentPage === index) {
            liPagination.className = "page-item active";
        }
        if (currentPage === aPage.textContent) {
            liPagination.className = "page-item active";
        }

        paginationContainer.appendChild(liPagination);
        liPagination.appendChild(aPage);
        paginationContainer.appendChild(liNextSearch);
        liNextSearch.appendChild(aNextSearch);


        aPage.addEventListener("click", async () => {
            debugger
            currentPage = aPage.textContent
            liPagination.className = "page-item active";
            

            aPage.href = "#";
            const params = buildParams();
            await getAllAnimeData(params);
            createElementSearch();

        })
    }

}
aPrevious.addEventListener("click", async () => {
    await retrocederPagina();
    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }

})
aNext.addEventListener("click", async () => {
    await nextPagina();

    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }
    if (currentPage === allPagination.last_visible_page) {
        liNext.className = "page-item disable";
        liNext.className = "page-link";
        liNext.href = ""

        liPrevious.className = "page-item disable";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "true")
        aPrevious.href = ""
    }
})

aPreviousSearch.addEventListener("click", async () => {
    await retrocederPaginaSearch();
    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }

})
aNextSearch.addEventListener("click", async () => {
debugger
    await nextPaginaSearch();
debugger
    if (currentPage == allPagination.last_visible_page){
    liPreviousSearch.className = "page-item disable";
    aPreviousSearch.className = "page-link";
    aPreviousSearch.setAttribute('aria-disabled', "true")
    aPreviousSearch.href = ""

    liNextSearch.className = "page-item disabled";
    aNextSearch.className = "page-link";
    aNextSearch.href = ""
    }

    if (currentPage > 1) {
        liPreviousSearch.className = "page-item";
        aPreviousSearch.className = "page-link";
        aPreviousSearch.setAttribute('aria-disabled', "false")
        aPreviousSearch.href = "#"
    }
        

})

btnSearch.addEventListener("click", async () => {
    currentPage = 1;
    const params = buildParams();
    await getAllAnimeData(params);
    createElementSearch();
})

selectType.addEventListener("change", async () => {
    const params = buildParams();
    await getAllAnimeData(params);
    if (inputSearch.value === "") {
        createElements();
    } else {
        createElementSearch();
    }
})
window.onload = async () => {
    await getAllAnimeData();
    createElements();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}