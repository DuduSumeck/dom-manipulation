async function fetchPopularMovies() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjE5NGMzNDFlNTk3OGNlNmU1ZDlkOGE4NTYzOGQxYSIsInN1YiI6IjY0YzU3NmRmZWVjNWI1MDBlMjNiYmEzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AQV8GQMvfS7PByxBHJY0itt9PiuVVn2TJt3If6SxxAM",
      },
    };
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    populateMovies(data);
  } catch (error) {
    console.error(`Could not get movies: ${error}`);
  }
}

function populateMovies(data) {
  data.results
    .map((result) => parseMovie(result))
    .forEach((movie) => renderMovie(movie));
}

function parseMovie(result) {
  return {
    image: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
    title: result.title,
    year: new Date(result.release_date).getFullYear(),
    rating: result.vote_average,
    description: result.overview,
  };
}

function renderMovie(movie) {
  const movies = document.querySelector(".movies");

  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie-container");

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const movieIcon = document.createElement("img");
  movieIcon.classList.add("movie-icon");
  movieIcon.setAttribute("src", movie.image);

  movieCard.appendChild(movieIcon);

  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");

  const movieTitle = document.createElement("h2");
  movieTitle.classList.add("movie-title");
  const titleText = document.createTextNode(`${movie.title} (${movie.year})`);
  movieTitle.appendChild(titleText);

  movieDetails.appendChild(movieTitle);

  const movieData = document.createElement("div");
  movieData.classList.add("movie-data");

  const movieRating = document.createElement("span");
  movieRating.classList.add("movie-rating");
  const ratingText = document.createTextNode(movie.rating);
  movieRating.appendChild(ratingText);

  movieData.appendChild(movieRating);

  const movieBookmark = document.createElement("span");
  movie.isBookmarked
    ? movieBookmark.classList.add("movie-bookmarked")
    : movieBookmark.classList.add("movie-bookmark");
  const bookmarkText = document.createTextNode("Favoritar");
  movieBookmark.appendChild(bookmarkText);

  movieData.appendChild(movieBookmark);

  movieDetails.appendChild(movieData);

  movieCard.appendChild(movieDetails);

  movieContainer.appendChild(movieCard);

  const movieDescription = document.createElement("p");
  movieDescription.classList.add("movie-description");
  const descriptionText = document.createTextNode(movie.description);
  movieDescription.appendChild(descriptionText);

  movieContainer.appendChild(movieDescription);

  movies.appendChild(movieContainer);
}

fetchPopularMovies();
