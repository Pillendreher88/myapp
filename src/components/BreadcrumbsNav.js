import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { LinkWrap } from './Utils/Link.js';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';


const BreadcrumbContainer = styled.div`
list-style: none;
background-color: #eee;
padding: 10px;
display: flex;
align-items: center;
margin: 10px 0;

`;

const Title = styled(Typography)`
margin-top: 20px;
margin-left: 10px;
margin-bottom: 20px;
`;

const pathConfig = {
  '/myaccount': { name: 'My Account', showTitle: true },
  '/products/games-films-music': { name: 'Games, Films and Music', showTitle: true },
  '/myaccount/myprofile': { name: 'My Profile', showTitle: true },
  '/myaccount/myaddresses': { name: 'My Addresses', showTitle: true },
  '/myaccount/myaddresses/add': { name: 'Add Address', showTitle: false },
  '/myaccount/myaddresses/edit': { name: 'Edit Address', showTitle: false },
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BreadcrumbsNav({ showTitle = true }) {

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const renderName = (to, slug) =>
    (pathConfig[to] && pathConfig[to].name ) ? pathConfig[to].name : capitalizeFirstLetter(slug);


  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumbs aria-label="breadcrumb">
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography color="textPrimary" key={to}>
                {renderName(to, value)}
              </Typography>
            ) : (
                <LinkWrap color="inherit" to={to} key={to}>
                  {renderName(to, value)}
                </LinkWrap>
              );
          })}
        </Breadcrumbs>
      </BreadcrumbContainer>
      {(showTitle || (pathConfig[location.pathname] && pathConfig[location.pathname].showTitle)) &&
        <Title variant="h2">
          {renderName(location.pathname, pathnames[pathnames.length - 1])}
        </Title>}
    </>
  )
}
