import React from 'react';
import styled from 'styled-components';

const Input: React.SFC<any> = React.forwardRef((props, ref) => (
  <StyledInput ref={ref} {...props} />
));

const StyledInput = styled.input`
  font-family: ${props => props.theme.fonts.sans};
  padding: 8px;
  font-size: 16px;
`;

export default Input;