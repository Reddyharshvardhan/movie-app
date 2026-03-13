
const  main = document.querySelector(".main");

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");

const createElement = (element) => document.createElement(element);

const createMovieCard = (movies) =>{
    for(let movie of movies) {

        const card = createElement("div");
        card.classList.add("total-card");

        const imgContainer = createElement("div");
        imgContainer.classList.add("img-container");

        const img = createElement("img");
        img.classList.add("card-img");
        img.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
        imgContainer.appendChild(img);

        const movieTitle = createElement("p");
        movieTitle.classList.add("title");
        movieTitle.textContent =`Title:${movie.Title}`;

        const year = createElement("p");
        year.classList.add("year");
        year.textContent = `Year:${movie.Year}`;

        const movieDetails = createElement("div");
        movieDetails.classList.add("movie-details");
        movieDetails.appendChild(movieTitle);
        movieDetails.appendChild(year);

        card.appendChild(imgContainer);
        card.appendChild(movieDetails);

        main.appendChild(card);
    }
};
const fetchMovies = async (movieName) => {
    main.innerHTML = "";

    const URL = `https://www.omdbapi.com/?apikey=e6a691c1&s=${movieName}`;

    try{
        const response = await fetch(URL);
        const data = await response.json(); 
        
        if(data.Search){
            createMovieCard(data.Search);
        }else{
            main.innerHTML = "<h2>No movies found</h2>";
        }
    } catch(error){
        console.log("Error fetching movies:",error);
    }
    
};
fetchMovies("avengers");

searchBtn.addEventListener("click",() =>{
    
     const movieName = searchInput.value.trim();

    if(movieName){
        fetchMovies(movieName);
    }

    
});

searchInput.addEventListener("keypress",() =>{
    if(event.key === "Enter"){
        const movieName = searchInput.value.trim();

        if(movieName){
        fetchMovies(movieName);
        }
        searchInput.value="";
    }
    
});

