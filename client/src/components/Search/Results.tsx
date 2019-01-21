import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Text from '../Text';
import tmdbImageUrl from '../../util/tmdbImageUrl';
import Pagination from './Pagination';

const SET_MOVIE_SEARCH_PAGE = gql`
  mutation SetMovieSearchPage($page: Int) {
    setMovieSearchPage(page: $page) @client
  }
`;

type MovieSearchResult = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path?: string;
}

interface ResultsProps {
  page: number;
  results: MovieSearchResult[];
  totalPages: number;
  totalResults: number;
}

const Results: React.SFC<ResultsProps> = ({
  page,
  results,
  totalPages,
  totalResults,
}) => (
  <ResultsWrapper
    bg="light2"
    py={4}
  >
    <Text mx={4} mb={2}>
      {totalResults} movies found. Viewing page {page} of {totalPages}
    </Text>
    <ResultsList>
      {results.map(result => (
        <ResultsItem
          key={result.id}
          px={4}
          py={3}
        >
          <PosterImage src={tmdbImageUrl(result.poster_path)} width="200" />
          <Box px={3}>
            <Text fontSize={4} fontWeight="bold" mb={2}>
              {result.title}
            </Text>
            <Text fontSize={3} color="gray" mb={3}>
              {result.release_date}
            </Text>
            <Text fontSize={2}>
              {result.overview}
            </Text>
          </Box>
        </ResultsItem>
      ))}
    </ResultsList>
    <Mutation mutation={SET_MOVIE_SEARCH_PAGE}>
      {(setPage) => (
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      )}
    </Mutation>
  </ResultsWrapper>
);

const ResultsWrapper = styled(Box)`
  width: 100%;

  border-top: 1px solid ${props => props.theme.colors.light1};
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const ResultsList = styled(Box)`
`;

const ResultsItem = styled(Flex)`
  border-top: 1px solid #e0e0e0;
`;

const PosterImage = styled.img`
  flex-shrink: 0;
  border-radius: 3px;
`;

export default Results;