import React from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../hooks/useCart';

import { Container } from './styles';

function CartInfo() {
  const { cart } = useCart()

  return (
    <Container>
      <div>
        <strong>Meu carrinho</strong>

        <span>
          {cart.length === 1 ? `${cart.length} item` : `${cart.length} itens`}
        </span>
      </div>

      <FiShoppingCart />
    </Container>
  )
}

export default CartInfo;