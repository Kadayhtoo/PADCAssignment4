import MovieListModel from '/js/model/MovieListModel.js';
import MovieItemModel from '/js/model/MovieItemModel.js';
import MovieListView from '../view/MovieListView.js';
import MovieDetailView from '../view/MovieDetailView.js';

class Controller {
    constructor() {

        this.movieListModel = new MovieListModel();
        this.movieListView = new MovieListView(this);
        this.movieDetailView = new MovieDetailView(this);
        this.movieItemModel = new MovieItemModel();
        this.movieObjects = [];

    }
    async init() {
        const movieData = await this.movieListModel
            .fetchUpcomingMovie(this.movieListModel.key);
        console.log(movieData);

        const movieObjects = await this.getUpcomingMovieData(movieData);
        console.log(movieObjects);

        this.displayMovieList(movieObjects);
    }

    async displayDetail(id) {
        const detailObject = await this.movieItemModel
            .fetchMovieDetail(id, this.movieItemModel.key);
        console.log(detailObject);
        
        this.movieDetailView.render(detailObject);
    }

    displayMovieList(movieObjects) {
        const templates = [];
        for (const movieObj of movieObjects) {
            templates.push(this.movieListView.getItemTemplate(movieObj));
        }

        this.movieListView.render(templates);
    }

    changeListView() {
        this.displayMovieList(this.movieObjects);
    }

    getUpcomingMovieData(data) {
        this.movieObjects = [];
        for (let movie of data) {
            let rating = 0;
            if(localStorage.getItem(movie.id)){
                rating = localStorage.getItem(movie.id);
            }
            console.log(rating);
            const movieObj = new MovieItemModel(movie.id, movie.title, movie.poster_path, movie.overview,rating, "");
            this.movieObjects.push(movieObj);
        }
        return this.movieObjects;
    }

    storeRating(movieId, ratingValue){
        this.movieItemModel.setRating(movieId, ratingValue);
        this.movieListView.ratingMovie(movieId, ratingValue);
    }

    storeFavourite(movieId, fav){
        this.movieItemModel.setFavourite(movieId, fav);       
    }
    getFavorite(movieId)
    {
      return  this.movieItemModel.getFavorite(movieId);
    }
}

export default Controller;