const linksSidebar = [
  { nameSidebar: "MENU", noHover: true },
  { nameSidebar: "Discovery", url: "#", iconSidebar: "fab fa-cc-discover" },
  { nameSidebar: "Top Rated", url: "#", iconSidebar: "far fa-star" },
  { nameSidebar: "Coming Soon", url: "#", iconSidebar: "fas fa-stopwatch" },
  {
    nameSidebar: "Dark Mode",
    url: "#",
    iconSidebar: "fas fa-moon",
    id: "dark-mode-link",
  },
  { nameSidebar: "Setting", url: "#", iconSidebar: "fas fa-cog" },
  { nameSidebar: "About us", url: "#", iconSidebar: "fas fa-address-card" },
];

const sidebar = document.getElementById("sidebar");
const ulSidebar = document.createElement("ul");

linksSidebar.forEach((link) => {
  const liSidebar = document.createElement("li");
  const a = document.createElement("a");

  if (link.iconSidebar) {
    const i = document.createElement("i");
    i.classList.add(...link.iconSidebar.split(" "));
    a.appendChild(i);
  }

  a.href = link.url || "#";
  a.classList.add("sidebar-link");

  if (link.noHover) {
    a.classList.add("menu");
  }

  if (link.id) {
    a.id = link.id;
  }

  if (link.nameSidebar === "Dark Mode") {
    const darkModeToggle = document.createElement("div");
    darkModeToggle.classList.add("dark-mode-toggle");
    darkModeToggle.addEventListener("click", toggleDarkMode);
    a.appendChild(darkModeToggle);
    const toggleButton = document.createElement("div");
    toggleButton.classList.add("toggle-button");
    darkModeToggle.appendChild(toggleButton);
  }

  a.insertAdjacentHTML(
    "beforeend",
    `<span class="link-text">${link.nameSidebar}</span>`
  );
  liSidebar.appendChild(a);
  ulSidebar.appendChild(liSidebar);
});

sidebar.appendChild(ulSidebar);

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  darkModeToggle.classList.toggle("on");
}
// the api

// async function updateMovieCard(search) {
//   const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=1`);
//   const data = await response.json();
//   const anime = data.data[0];

//   document.getElementById('movie-image').src = anime.images.jpg.large_image_url;
//   document.getElementById('movie-title').textContent = anime.title;
//   document.getElementById('movie-description').textContent = anime.synopsis;
// }

// Call the function with a search term
// updateMovieCard('Naruto');

function Anime(id, title, synopsis, episodes, imageUrl, score) {
  this.id = id;
  this.title = title;
  this.synopsis = synopsis;
  this.episodes = episodes;
  this.imageUrl = imageUrl;
  this.score = score;
}

async function fetchAnimeAndRender(search) {
  try {

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log("response", data);

    // Check for expected data structure
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data format from API.");
    }

    // Limit to first 20 results for simplicity
    const animeList = data.data.slice(0, 20);

    // Map through anime and create Anime objects
    const animeObjects = animeList.map((anime) => {
      return new Anime(
        anime.mal_id,
        anime.title,
        anime.synopsis,
        anime.episodes,
        anime.images.jpg.image_url,
        anime.score
      );
    });

    // Render anime
    renderAnime(animeObjects);
  } catch (error) {
    console.error("Error fetching or rendering anime:", error);
    // Handle error appropriately (e.g., show error message to user)
  }
}

function renderAnime(animeList) {
  console.log("jjjj", animeList);
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = ""; // Clear previous content

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.setAttribute("class", "movie-card");
    // card.classList.add("card");
    card.innerHTML = `
      <img src="${anime.imageUrl}" alt="${anime.title}">
      <div>
        <h2>${anime.title}</h2>
        <p>Episodes: ${anime.episodes}</p>
        <div class="rating">&#9733; ${anime.score} </div>
      </div>
    `;
    mainSection.appendChild(card);
  });
}

// Call fetchAnimeAndRender with a default search query when the page loads
window.onload = function () {
  fetchAnimeAndRender(""); // Default search query example ('naruto')
  
};


// the seachbar function
document.querySelector(".search-icon").addEventListener("click", function () {
  document.querySelector(".searchbar").style.display = "flex";
  document.querySelector(".search-icon").style.display = "none";
});

// searchfunctionworks

async function fetchAnimeAndRender(search) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data.score);

    // Check for expected data structure
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data format from API.");
    }


    
    // Limit to first 20 results for simplicity
    const animeList = data.data.slice(0, 20);

    // Map through anime and create Anime objects
    const animeObjects = animeList.map((anime) => {
      return new Anime(
        anime.mal_id,
        anime.title,
        anime.synopsis,
        anime.episodes,
        anime.images.jpg.image_url,
        anime.score
      );
    });

    // Render anime
    renderAnime(animeObjects);
  } catch (error) {
    console.error("Error fetching or rendering anime:", error);
    // Handle error appropriately (e.g., show error message to user)
  }
}

function renderAnime(animeList) {
  console.log("Anime List:", animeList);
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = ""; // Clear previous content

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.setAttribute("class", "movie-card");
    card.innerHTML = 
    `
    
          <a href = "Movie detiles.html?animeId=${anime.id}">
        <img src="${anime.imageUrl}" alt="${anime.title}">
      <div>
        <h2>${anime.title}</h2>
      </a>
        <p>Episodes: ${anime.episodes}</p>
        <div class="rating">&#9733; ${anime.score}</div>
      </div>
    `;
    mainSection.appendChild(card);
  });
}

// Search functionality
document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input").value;
  if (searchInput) {
    await fetchAnimeAndRender(searchInput);
  }
});

document.querySelector(".search-icon").addEventListener("click", function () {
  document.querySelector(".searchbar").style.display = "flex";
  document.querySelector(".search-icon").style.display = "none";
});

document
  .querySelector(".search-icon")
  .addEventListener("click", async function () {
    // Clear existing content
    const mainSection = document.getElementById("main-section");
    mainSection.innerHTML = "";

    // Show the search bar
    document.querySelector(".searchbar").style.display = "flex";
    document.querySelector(".search-icon").style.display = "none";

    // Optionally, you can immediately trigger the search if there is existing input
    const searchInput = document.getElementById("search-input").value.trim(); // Trim whitespace
    if (searchInput) {
      await fetchAnimeAndRender(searchInput);
    }
  }); 
if (sessionStorage.getItem("userID" , null) === null){

  let navbar = document.getElementById("navbar");
  navbar.innerHTML= `<div class="navbar-container">
            <div class="logo-container">
              <h6 id="logo"> ANIMOVES</h6>
             
            </div>
            <div class="menu-container">
              
              <a href="index.html"><li class="liNavbar active">Home</li></a>
              <li class="liNavbar">Movies</li>
              <li class="liNavbar">Series</li>
            </div>
    
            <div class="profile-container">
              <div style="margin: 15px;">
                <span class="fas fa-search" > </span>
              </div>
              <div>
              <button type="button" onclick="window.location.href='pages/login.html'" class="btn btn-light" style="background-color:#b43feb;color: #ffffff;border-color: #b43feb ;">Login</button>
               </div>
              
            </div>
           <i id="btnMenu" class="fa-solid fa-bars"></i>
          </div>`;
}

