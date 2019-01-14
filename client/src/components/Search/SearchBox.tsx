import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Card, Heading } from 'rebass';
import { Mutation } from 'react-apollo';
import SearchForm from './Form';

const SET_MOVIE_SEARCH = gql`
  mutation SetMovieSearch($search: String!) {
    setMovieSearch(search: $search) @client
  }
`;

const SearchBox: React.SFC<{}> = () => (
  <Mutation mutation={SET_MOVIE_SEARCH}>
    {(setMovieSearch => (
      <StyledBox
        bg="blue2"
        borderRadius={5}
        border="1px solid black"
        boxShadow="0 0 8px 8px rgba(0, 0, 0, .1)"
        my={5}
        p={5}
        width={[1, 1/2]}
      >
        <Heading
          color="darkBlue"
          fontSize={6}
          mb={3}
        >
          FilmBFF
        </Heading>
        <SearchForm onSubmit={search => setMovieSearch({ variables: { search } })} />
      </StyledBox>
    ))}
  </Mutation>
);


const StyledBox = styled(Card)`
  text-align: center;
`

export default SearchBox;