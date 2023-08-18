const movies = [
    {
        image: '/images/batman.png',
        title: 'Batman',
        rating: 9.2,
        year: 2022,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isBookmarked: true
    },
    {
        image: '/images/avatar.png',
        title: 'Avatar',
        rating: 9.5,
        year: 2009,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isBookmarked: false
    }
];

function renderMovie(movie) {
    const movies = document.querySelector('.movies');
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const movieCard = document.createElement('div');

    movieCard.classList.add('movie-card');
    
    const movieIcon = document.createElement('img');
    movieIcon.classList.add('movie-icon');
    movieIcon.setAttribute('src', movie.image);
    
    movieCard.appendChild(movieIcon);
    
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
    
    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    const titleText = document.createTextNode(`${movie.title} (${movie.year})`);
    movieTitle.appendChild(titleText);
    
    movieDetails.appendChild(movieTitle);
    
    const movieData = document.createElement('div');
    movieData.classList.add('movie-data');
    
    const movieRating = document.createElement('span');
    movieRating.classList.add('movie-rating');
    const ratingText = document.createTextNode(movie.rating);
    movieRating.appendChild(ratingText);
    
    movieData.appendChild(movieRating);
    
    const movieBookmark = document.createElement('span');
    movie.isBookmarked ? movieBookmark.classList.add('movie-bookmarked') : movieBookmark.classList.add('movie-bookmark');
    const bookmarkText = document.createTextNode('Favoritar');
    movieBookmark.appendChild(bookmarkText);
    
    movieData.appendChild(movieBookmark);
    
    movieDetails.appendChild(movieData);
    
    movieCard.appendChild(movieDetails);

    movieContainer.appendChild(movieCard);
    
    const movieDescription = document.createElement('p');
    movieDescription.classList.add('movie-description');
    const descriptionText = document.createTextNode(movie.description);
    movieDescription.appendChild(descriptionText);
    
    movieContainer.appendChild(movieDescription);

    movies.appendChild(movieContainer);
}

movies.forEach(movie => renderMovie(movie));
