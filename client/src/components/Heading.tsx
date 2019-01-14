import React from 'react';
import { Heading as HeadingBase, HeadingProps } from 'rebass';

const Heading: React.SFC<HeadingProps> = (props: HeadingProps) => (
  <HeadingBase
    color="black"
    fontFamily="sans"
    {...props}
  />
);

export default Heading;