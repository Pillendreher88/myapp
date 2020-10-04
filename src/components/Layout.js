import { Container } from '@material-ui/core'
import React from 'react'
import CartPreview from './Cart/CartPreview'
import GlobalMessage from './GlobalMessage'
import NavBarContainer from './Header/NavBarContainer'

export default function Layout({ children }) {
  return (
    <>
      <NavBarContainer />
      <CartPreview />
      <Container maxWidth="lg" disableGutters>
        <GlobalMessage />
        {children}
      </Container>
    </>
  )
}
