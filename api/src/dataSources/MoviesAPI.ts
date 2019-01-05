import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export default class MoviesAPI extends RESTDataSource {
  static BASE_URL = 'https://api.themoviedb.org/3/';
  static MOVIE_ENDPOINT = 'movie';
  static MOVIE_SEARCH_ENDPOINT = 'search/movie';

  private apiKey: string;

  constructor() {
    super();
    this.baseURL = MoviesAPI.BASE_URL;
    this.apiKey = process.env.TMDB_API_KEY || '';
  }

  async findMovie(tmdbId: number) {
    return this.get(`${MoviesAPI.MOVIE_ENDPOINT}/${tmdbId}`, { api_key: this.apiKey });
  }

  async searchMovies(query: string, page: number = 1) {
    return this.get(MoviesAPI.MOVIE_SEARCH_ENDPOINT, { api_key: this.apiKey, query, page });
  }
}