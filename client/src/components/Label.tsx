import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';

const Label: React.SFC<any> = (props) => (
  <StyledLabel {...props} as="label" />
);

const StyledLabel = styled(Text)`
  display: block;
  font-family: ${props => props.theme.fonts.sans};
  font-weight: bold;
  margin-bottom: 4px;
`;

export default Label;