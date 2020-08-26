import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDopUpIcon from '@material-ui/icons/ArrowDropUp';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
background-color:    #6666ff;
color: white;
padding: 1rem;
`;

const DropDownMenu = ({ list, slug, close }) => {
  return (
    <MenuContainer>
      <List component="nav">
        {list.map((item) =>
          <ListItem
            button onClick={() => close()}
            component={Link}
            to={item.url ? item.url : `/${slug}/${item.slug}`}
            key={`/${slug}/${item.slug}`}>
            <ListItemText primary={item.name} />
          </ListItem>
        )}
      </List>
    </MenuContainer>
  );

}

export const DropDown = ({ children, title, active }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color={open ? "primary" : (active ? "secondary" : 'default')}
        onClick={handleClick}
        startIcon={open ? <ArrowDopUpIcon /> : <ArrowDropDownIcon />}
      >
        {title}
      </Button>
      <Popper open={open} anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => {
          return <Fade {...TransitionProps} timeout={50}>
            <ClickAwayListener onClickAway={handleClose}>
              <div>
                {children(handleClose, open)}
              </div>
            </ClickAwayListener>
          </Fade>
        }}
      </Popper>
    </div>
  );
}

export default DropDownMenu;