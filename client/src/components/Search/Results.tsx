import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import Text from '../Text';

type MovieSearchResult = {
  id: number;
  title: string;
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
    <Text mx={4}>
      {totalResults} movies found. Viewing page {page} of {totalPages}
    </Text>
    <ResultsList>
      {results.map(result => (
        <ResultsItem
          key={result.id}
          p={2}
        >
          <Text fontSize={4}>
            {result.title}
          </Text>
        </ResultsItem>
      ))}
    </ResultsList>
  </ResultsWrapper>
);

const ResultsWrapper = styled(Box)`
  width: 100%;

  border-top: 1px solid ${props => props.theme.light1};
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const ResultsList = styled(Box)`

`;

const ResultsItem = styled(Box)`
  background-color: ${props => props.theme.light2};
`;

export default Results;