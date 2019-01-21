import { createGlobalStyle } from 'styled-components';

export interface ThemedComponentProps {
  theme: {
    colors: any;
    fonts: any;
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: ThemedComponentProps) => props.theme.colors.light1};
    margin: 0;    
  }
`;

export default GlobalStyle;