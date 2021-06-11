import React from 'react';
import CartInfo from '../CartInfo';

import { Container } from './styles';

function Header() {
  return (
    <Container>
      <div data-testid="header-container">
        <h1 data-testid="logo">Alphashoes</h1>

        <CartInfo />
      </div>
    </Container>
  )
}

export default Header;