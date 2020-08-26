import { Link } from 'react-router-dom';
import styled from 'styled-components';

const styledLink = styled(Link)`
text-decoration: none;
color: white;
border-radius: 10px;

&:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const LinkWrap = styled(Link)`
text-decoration: none;
color: inherit;

&:hover {
    text-decoration: none;
  }
`;

export default styledLink;