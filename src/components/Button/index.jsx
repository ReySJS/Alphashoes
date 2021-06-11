import React from 'react';
import { FiShoppingBag } from 'react-icons/fi'

import { Container } from './styles'

function Button(props) {
  return (
    <Container {...props}>
      <div>
        <FiShoppingBag />
      </div>

      <span>
        Adicionar ao carrinho
      </span>
    </Container>
  )
}

export default Button;
