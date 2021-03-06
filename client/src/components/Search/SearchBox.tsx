import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Card } from 'rebass';
import { Mutation } from 'react-apollo';
import Heading from '../Heading';
import SearchForm from './SearchForm';

const SET_MOVIE_SEARCH = gql`
  mutation SetMovieSearch($search: String!) {
    setMovieSearch(search: $search) @client
  }
`;

const SearchBox: React.SFC<{ initialSearch?: string }> = ({ initialSearch }) => (
  <Mutation mutation={SET_MOVIE_SEARCH}>
    {(setMovieSearch => (
      <Card
        bg="light3"
        borderRadius={2}
        border="1px solid black"
        boxShadow="0 0 8px 8px rgba(0, 0, 0, .1)"
        my={5}
        p={5}
        width={[1, 1/2]}
      >
        <Heading
          fontSize={6}
          mb={4}
          textAlign="center"
        >
          FilmBFF
        </Heading>
        <SearchForm
          initialSearch={initialSearch}
          onSubmit={search => setMovieSearch({ variables: { search } })}
        />
      </Card>
    ))}
  </Mutation>
);

export default SearchBox;