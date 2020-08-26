import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../BreadcrumbsNav.js';
import Typography from '@material-ui/core/Typography';


const Title = styled(Typography)`
margin-top: 20px;
margin-left: 10px;
margin-bottom: 20px;
`;

export default function Header() {
  return (
      <Breadcrumbs showTitle = {false}/>
  )
}
