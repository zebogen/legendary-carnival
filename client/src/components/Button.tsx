import React from 'react';
import styled from 'styled-components';
import { Button as RButton } from 'rebass';

const StyledRButton = styled(RButton)`
  font-family: ${props => props.theme.fonts.sans};

  &:hover {
    background-color: ${props => props.theme.colors.dark2};
  }
`;

const Button: React.SFC<any> = (props) => (
  <StyledRButton
    bg="dark1"
    color="white"
    {...props}
  />
)

export default Button;