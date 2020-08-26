import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import SideMenu from './SideMenu.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { getNumberInCart } from '../../reducers/cartReducer.js';
import { logout, fetchSuggestions, deleteSuggestions } from '../../actions';
import  NavbarContent from './NavBar';
import SearchDrawer from './SearchDrawer.js';
import { getLoadingInfo } from '../../reducers/selectors.js';


function Navbar(props) {

  const [menuIsOpen, setMenuState] = useState(false);
  const [searchIsOpen, setSearchISOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const closeMenu = () => setMenuState(false);
  const openMenu = () => setMenuState(true);

  const closeSearch = () => setSearchISOpen(false);
  const openSearch = () => setSearchISOpen(true);

  return (
    <AppBar position="relative">
      <Container maxWidth="lg" disableGutters>
        <Drawer open={menuIsOpen} onClose={closeMenu} >
          <SideMenu categories={Object.values(props.categories)} closeMenu={closeMenu} authenticated = {props.authenticated} />
        </Drawer>
        <Drawer open={searchIsOpen} onClose={closeSearch} anchor="top">
          <SearchDrawer suggestions={props.suggestions} deleteSuggestions={props.deleteSuggestions} fetchSuggestions={props.fetchSuggestions} 
          isLoading = {props.searchLoading} onChange_ ={closeSearch}/>
        </Drawer>
        <Toolbar>
          <NavbarContent {...{...props, isSmallScreen, openMenu, openSearch}}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  cartSize: getNumberInCart(state.cart),
  categories: state.categories.categories,
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  suggestions: state.products.suggestions,
  searchLoading: getLoadingInfo(state, "FETCH_SUGGESTIONS"),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchSuggestions: (data) => dispatch(fetchSuggestions(data)),
  deleteSuggestions: () => dispatch(deleteSuggestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);