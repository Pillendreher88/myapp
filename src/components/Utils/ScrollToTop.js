import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useLocation } from "react-router-dom";

const ToTop = styled(IconButton)`

position: fixed;
bottom: 15px;
left: 20px;
padding: 20px;
z-index: 1000;
border-radius: 50%;
background-color: rgba(63, 81, 181, 0.3);
&:hover {
  background-color: rgba(63, 81, 181, 0.7);
}

`;

export default function ScrollToTop() {

  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener("scroll", toggleVisibility);
    return () => {
      document.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    }
    else setVisible(false);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div>
      {visible &&
        <ToTop onClick={scrollToTop} color="primary" >
          <ArrowUpwardIcon />
        </ToTop>
      }
    </div>
  )
}
