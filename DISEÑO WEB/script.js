const movies = [
  {
    id: 1,
    title: "Inception",
    category: "Acción",
    description: "Un ladrón que roba secretos a través de los sueños.",
    image: "img/incepcion.jpg",
  },
  {
    id: 2,
    title: "Toy Story",
    category: "Animación",
    description: "Juguetes que cobran vida cuando no los ves.",
    image: "img/toystory.jpg",
  },
  {
    id: 3,
    title: "El Padrino",
    category: "Drama",
    description: "Historia de una familia mafiosa.",
    image: "img/elpadri.jpg",
  },
  {
    id: 4,
    title: "Avengers",
    category: "Acción",
    description: "Superhéroes luchan para salvar el mundo.",
    image: "img/avengers.jpg",
  },
];

const movieList = document.getElementById("movieList");
const categoryFilter = document.getElementById("categoryFilter");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderMovies() {
  const selected = categoryFilter.value;
  movieList.innerHTML = "";

  const filtered =
    selected === "Todas"
      ? movies
      : movies.filter((movie) => movie.category === selected);

  filtered.forEach((movie) => {
    const isFav = favorites.includes(movie.id);
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.category}</p>
          <p style="font-size: 12px;">${movie.description}</p>
        </div>
        <span class="heart ${isFav ? "red" : "gray"}" data-id="${movie.id}">
          ❤️
        </span>
      `;

    movieList.appendChild(card);
  });
}

function toggleFavorite(id) {
  const movieId = parseInt(id);
  if (favorites.includes(movieId)) {
    favorites = favorites.filter((fav) => fav !== movieId);
  } else {
    favorites.push(movieId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderMovies();
}

categoryFilter.addEventListener("change", renderMovies);

movieList.addEventListener("click", (e) => {
  if (e.target.classList.contains("heart")) {
    const id = e.target.getAttribute("data-id");
    toggleFavorite(id);
  }
});

renderMovies();
