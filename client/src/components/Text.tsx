import React from 'react';
import { Text as TextBase, TextProps } from 'rebass';

const Text: React.SFC<TextProps> = (props: TextProps) => (
  <TextBase
    color="darkBlue"
    fontFamily="sans"
    {...props}
  />
);

export default Text;