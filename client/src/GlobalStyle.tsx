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
    font-family: ${(props: ThemedComponentProps) => props.theme.fonts.sans};
    margin: 0;
  }
`;

export default GlobalStyle;