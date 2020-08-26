import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import DropDownMenu from './DropDownMenu.js';
import Avatar from '@material-ui/core/Avatar';
import Search from './SearchField.js';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { LinkWrap } from '../Utils/Link.js';
import { Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import urls from '../../urls.js';


const Gap = styled.div`
  flex-grow: 1;
`;
const Home = styled.div`
  display: flex;
  padding-right: 12px;
`;

const CollapsibleNav = styled.nav`
  display: flex;
  align-items: center;
  align-self: stretch;
`

export default function ButtonAppBar({
  cartSize,
  categories,
  authenticated,
  user,
  isSmallScreen,
  openSearch,
  openMenu,
  requetSearch,
  fetchSuggestions,
  searchLoading,
  deleteSuggestions,
  suggestions }) {

  const categoryNav = (
    <CollapsibleNav>
      {Object.values(categories).map((category) =>
        <NavMenu to={`/products/${category.slug}`}
          title={category.name}
          key={category.slug}
          list={category.subcategories}
          slug={`products/${category.slug}`} />
      )}
    </CollapsibleNav>
  );

  const loginButton = (
    <Tooltip title={"Login"} disableHoverListener={isSmallScreen}>
      <LinkWrap to="/login">
        < IconButton color="inherit" aria-label="menu" >
          <AccountIcon fontSize="large" />
        </IconButton>
      </LinkWrap>
    </Tooltip>);

  const accountButton = (
    
      <LinkWrap to="/myaccount">
        < IconButton color="inherit" aria-label="menu" >
          <Avatar src={urls.smallAvatar + user.avatar} />
        </IconButton>
      </LinkWrap>
      );

  return (
    <>
      <Home>
        <Button component={Link} to="/home" color="inherit">Home</Button>
      </Home>
      {isSmallScreen ? (
        <IconButton color="inherit" aria-label="menu" onClick={openMenu}>
          <MenuIcon />
        </IconButton>) : categoryNav}
      <Gap />
      {isSmallScreen ?   
        <IconButton color="inherit" aria-label="menu" onClick={openSearch}>
            <SearchIcon />
        </IconButton> :
        <Search suggestions={suggestions} deleteSuggestions={deleteSuggestions} fetchSuggestions={fetchSuggestions} isLoading={searchLoading}/>}
      <Button to="/cart" color="inherit" component={Link}>
        <Badge badgeContent={cartSize} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Button>
      {authenticated ?
        (isSmallScreen ? accountButton : 
        <NavMenu to="/myaccount"
          title={user.name}
          startIcon={<Avatar src={urls.smallAvatar + user.avatar} />}
          key="myaccount"
          list={[{ name: "My Addresses", slug: "myaddresses" }, { name: "My Profile", slug: "myprofile" }, { name: "Logout", url: "/logout" }]}
          slug="myaccount" /> ) : loginButton
      }
    </>
  );
}

const NavMenu = ({ to, title, list, slug, startIcon }) => {

  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);

  const handleMouseEnter = event => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={anchorEl}
      style={{ height: "100%" }}>
      <Button
        component={Link}
        to={to} color="inherit"
        startIcon={startIcon && startIcon}
        style={{ height: "100%" }}>
        {title}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        disablePortal={true} transition
        style={{ zIndex: 1200 }}
        placement='bottom-start'>
        {({ TransitionProps }) => {
          return <Fade {...TransitionProps} timeout={50}>
            <DropDownMenu list={list} slug={slug} close={() => setOpen(false)} />
          </Fade>
        }}
      </Popper>
    </div>
  );
}