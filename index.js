(() => {
  const toogle = document.querySelector(".search-toogle");
  toogle.addEventListener("change", async () => {
    if (toogle.checked) {
      const bookmarkedMovies = getBookmarkedMovies();
      renderMovies(bookmarkedMovies);
    } else {
      const popularMovies = await getPopularMovies();
      renderMovies(popularMovies);
    }
  });
})();

(() => {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.querySelector(".search-input");
    const query = input.value.trim();
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
      const movies = await fetchMovies(url);
      renderMovies(movies);
    }
  });
})();

document.addEventListener("DOMContentLoaded", async () => {
  const popularMovies = await getPopularMovies();
  renderMovies(popularMovies);
});

async function getPopularMovies() {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const movies = await fetchMovies(url);
  return movies;
}

async function fetchMovies(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjE5NGMzNDFlNTk3OGNlNmU1ZDlkOGE4NTYzOGQxYSIsInN1YiI6IjY0YzU3NmRmZWVjNWI1MDBlMjNiYmEzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AQV8GQMvfS7PByxBHJY0itt9PiuVVn2TJt3If6SxxAM",
    },
  };
  const response = await fetch(url, options);
  const { results } = await response.json();
  return results;
}

function renderMovies(movies) {
  const moviesContainer = document.querySelector(".movies");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, release_date, vote_average, overview, id } =
      movie;
    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movies = document.querySelector(".movies");

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const movieIcon = document.createElement("img");
    movieIcon.classList.add("movie-icon");
    movieIcon.setAttribute("src", image);

    movieIcon.addEventListener("error", () => {
      movieIcon.setAttribute("src", "/images/film.png");
    });

    movieCard.appendChild(movieIcon);

    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movie-details");

    const movieTitle = document.createElement("h2");
    movieTitle.classList.add("movie-title");
    const titleText = document.createTextNode(`${title} (${year})`);
    movieTitle.appendChild(titleText);

    movieDetails.appendChild(movieTitle);

    const movieData = document.createElement("div");
    movieData.classList.add("movie-data");

    const movieRating = document.createElement("span");
    movieRating.classList.add("movie-rating");
    const ratingText = document.createTextNode(vote_average);
    movieRating.appendChild(ratingText);

    movieData.appendChild(movieRating);

    const movieBookmark = document.createElement("span");
    movieBookmark.classList.add("movie-bookmark");
    movieBookmark.dataset.movieId = id;

    const bookmarkedMovies = getBookmarkedMovies();
    movieBookmark.classList.toggle(
      "movie-bookmarked",
      bookmarkedMovies.map((bookmarked) => bookmarked.id).includes(id)
    );

    movieBookmark.addEventListener("click", () => {
      toogleBookmark(movieBookmark, movie);
    });

    const bookmarkText = document.createTextNode("Favoritar");
    movieBookmark.appendChild(bookmarkText);

    movieData.appendChild(movieBookmark);

    movieDetails.appendChild(movieData);

    movieCard.appendChild(movieDetails);

    movieContainer.appendChild(movieCard);

    const movieDescription = document.createElement("p");
    movieDescription.classList.add("movie-description");
    const descriptionText = document.createTextNode(overview);
    movieDescription.appendChild(descriptionText);

    movieContainer.appendChild(movieDescription);

    movies.appendChild(movieContainer);
  });
}

function toogleBookmark(bookmark, movie) {
  const bookmarkedMovies = getBookmarkedMovies();

  const index = bookmarkedMovies
    .map((bookmarked) => bookmarked.id)
    .indexOf(movie.id);

  if (index === -1) {
    bookmarkedMovies.push(movie);
    bookmark.classList.add("movie-bookmarked");
  } else {
    bookmarkedMovies.splice(index, 1);
    bookmark.classList.remove("movie-bookmarked");
  }

  localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarkedMovies));
}

function getBookmarkedMovies() {
  return JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
}
