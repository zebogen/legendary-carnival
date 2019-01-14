import React from 'react';

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
  <div>
    <p>{totalResults} movies found. Viewing page {page} of {totalPages}</p>
    <ul>
      {results.map(result => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  </div>
);

export default Results;