import React from 'react';
import { Box, Flex } from 'rebass';
import { MutationFn } from 'react-apollo';

interface PaginationProps {
  page: number;
  setPage: MutationFn;
  totalPages: number;
}

const Pagination: React.SFC<PaginationProps> = ({ setPage, page, totalPages }) => (
  <Flex>
    <Box>
      <button
        disabled={page <= 1}
        onClick={() => setPage({ variables: { page: page - 1 } })}
      >
        Previous
      </button>
    </Box>
    <Box>
      <button
        disabled={page >= totalPages}
        onClick={() => setPage({ variables: { page: page + 1 } })}
      >
        Next
      </button>
    </Box>
  </Flex>
);

export default Pagination;