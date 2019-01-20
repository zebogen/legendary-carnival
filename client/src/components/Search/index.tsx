import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import SearchBox from './SearchBox';
import Results from './Results';

const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      page
      total_results
      total_pages
      results {
        id
        title
        release_date
        overview
        poster_path
      }
    }
  }
`;

const GET_MOVIE_SEARCH = gql`
  {
    movieSearch @client
  }
`;

const Search: React.SFC<{}> = () => (
  <Query query={GET_MOVIE_SEARCH}>
    {({ data: { movieSearch } }) => (
      <>
        <SearchBox initialSearch={movieSearch} />
        {movieSearch.length > 0 && (
          <Query query={SEARCH_MOVIES_QUERY} variables={{ query: movieSearch }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error}`;

              const { searchMovies } = data;

              return (
                <Results
                  page={searchMovies.page}
                  results={searchMovies.results}
                  totalPages={searchMovies.total_pages}
                  totalResults={searchMovies.total_results}
                />
              ); 
            }}
          </Query>
        )}
      </>
    )}
  </Query>
);

export default Search;