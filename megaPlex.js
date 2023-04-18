let allAnimeData = [];
let GET_URL = "https://api.jikan.moe/v4/anime";
let animeContainer = document.querySelector(".animeContainer")
let containerTextCenter = document.querySelector("#containerText")
let animeRow = document.querySelector("#rowContainer")


getAllAnimeData = async () => {
    const response = await fetch(GET_URL)
        const {data} = await response.json();
        console.log(data);
        allAnimeData = data;
        
    }
   const createElements = () =>{
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

    window.onload = async () => {
        await getAllAnimeData();
        createElements();
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }