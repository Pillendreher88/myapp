import React, { useState } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '../Utils/Link.js';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


const MenuContent = styled.div`
width: 300px;
height: 100%;
min-width: 220px;
background-color: #3f51b5;
color: #fff;
overflow: hidden;
position: relative;
`;

const Slide = styled.div`
position: absolute;
top: 0;
left: 0;
width: 300px;
height: 100%;
transition: transform 0.3s linear;
`;
const SideMenu = ({ categories, closeMenu, authenticated }) => {

  const [category, setCategory] = useState(0);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const openCategory = (category) => {
    setCategory(category);
    setSubMenuOpen(true);
  }

  const renderCategories = () => {

    return categories.map((category, index) =>
      <ListItem button key={category.name} onClick={() => openCategory(index)}>
        <ListItemText primary={category.name} />
        <ListItemIcon>
          <ArrowForward />
        </ListItemIcon>
      </ListItem>
    )
  }

  const renderLink = (to, title) => {
    return (

      <Link to={to} key={title}>
        <ListItem button onClick={() => closeMenu()} >
          < ListItemText primary={title} />
        </ListItem>
      </Link>);
  }

  const renderSubs = () => {

    return categories[category].subcategories.map((item, index) =>
      <Link to={`/products/${categories[category].slug}/${item.slug}`} key={item.name}>
        <ListItem button onClick={() => closeMenu()} >
          <ListItemText primary={item.name} />
        </ListItem>
      </Link>
    )
  }

  return (

    <MenuContent>
      <Slide style={subMenuOpen ? { transform: "translate(-100%,0)" } : null}>
        <Box
          display="flex"
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          pl={2}
        >
          <Typography variant="h6" component="span">
            Browse Categories
          </Typography>
          <IconButton onClick={() => closeMenu()} >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List component="nav">
          {renderCategories()}
          <Divider />
          {authenticated ?
            <>
              {renderLink("/myaccount", "My Account")}
              {renderLink("/logout", "Logout")}
            </> :
            renderLink("/login", "Login")}
        </List>
      </Slide>

      <Slide style={subMenuOpen ? null : { transform: "translate(100%,0)" }}>
        <Box
          display="flex"
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={() => setSubMenuOpen(false)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="span">
            {categories[category].name}
          </Typography>
          <IconButton onClick={() => closeMenu()} >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List component="nav">
          <Link to={`/products/${categories[category].slug}`}>
            <ListItem button onClick={() => closeMenu()} >
              <ListItemText primary={"All"} />
            </ListItem>
          </Link>
          {renderSubs()}
        </List>
      </Slide>
    </MenuContent>
  );
}

export default SideMenu;


